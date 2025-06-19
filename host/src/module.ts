import * as vm from 'node:vm'

interface CacheEntry<T> {
    data: T
    timestamp: number
    ttl: number
}

/**
 * We do not fetch every chunks on every request
 * cache chunks for 5 seconds for benchmarks. The TTL should be longer
 */
const CACHE_TTL = 5000
let manifestCache = new Map<string, CacheEntry<any>>()
let moduleCodeCache = new Map<string, CacheEntry<string>>()
let moduleCache = new Map<string, CacheEntry<any>>()

// Check if cache entry is expired
const isExpired = <T>(entry: CacheEntry<T>): boolean => {
    return Date.now() - entry.timestamp > entry.ttl
}

// Get from cache if valid, otherwise return undefined
const getFromCache = <T>(cache: Map<string, CacheEntry<T>>, key: string): T | undefined => {
    const entry = cache.get(key)
    if (!entry || isExpired(entry)) {
        cache.delete(key) // Clean up expired entry
        return undefined
    }
    return entry.data
}

// Set cache entry with TTL
const setCache = <T>(cache: Map<string, CacheEntry<T>>, key: string, data: T): void => {
    cache.set(key, {
        data,
        timestamp: Date.now(),
        ttl: CACHE_TTL
    })
}

/**
 * fetch remote manifest to know what chunk to load
 */
export const getManifest = async (url: string) => {
    const manifestResponse = await fetch(`${url}/.vite/manifest.json`)
    if (!manifestResponse.ok) throw new Error(`fail to fetch manifest`)
    const manifest = await manifestResponse.json()

    return manifest
}

/**
 * fetch module from cache or from remote
 */
export const getModule = async (url: string, entryFile: any) => {

    const key = `${url}/${entryFile.file}`

    const cachedCode = getFromCache(moduleCodeCache, key)
    if (cachedCode) {
        return cachedCode
    }

    const codeResponse = await fetch(`${url}/${entryFile.file}`)
    if (!codeResponse.ok) throw new Error(`fail to fetch module ${entryFile.file}`)
    const code = await codeResponse.text()

    setCache(moduleCodeCache, key, code)

    return code
}

export const get = async (url: string): Promise<{code: string, entryFile: any}> => {

    const manifest = getFromCache(manifestCache, url) ? getFromCache(manifestCache, url) : await getManifest(url)
    setCache(manifestCache, url, manifest)
    
    // Find the main entry
    const entryFile = Object.values(manifest).find((entry: any) => entry.isEntry)
    
    if (!entryFile) {
        throw new Error('No entry file found in manifest')
    }
    
    return {code: await getModule(url, entryFile), entryFile}
}

/**
 * transform relative import into "fetchable" import
 */
export const makeHttpImport = (url: string) => async (specifier: string): Promise<string> => {
    const entries = getFromCache(manifestCache, url)

    const entryFile = Object.values(entries).find((entry: any) => {
        return specifier === `./${entry.file}`
    })
    
    const code = await getModule(url, entryFile)
    
    return isolate(url)(code, entryFile)
}

/**
 * return an isolated module from code
 */
export const isolate = (url: string) => async <M>(code: string, entryFile: any): Promise<M> => {
    const key = `${url}/${entryFile.file}`

    const cachedModule = getFromCache(moduleCache, key)
    if(cachedModule) return cachedModule

    const context = makeContext(url)
    const module = new vm.SourceTextModule(code, {context})

    await module.link(withLinker(url, context))
    
    await module.evaluate()
    
    const exports: any = module.namespace

    setCache(moduleCache, key, exports)
    
    return exports as M
}

/**
 * custom global fetch function that calls host fetch function locally instead of doing a HTTP req
 */
const customFetch: typeof fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const root = (await import('./microbackend.js')).default

    const req = new Request(input, init)

    const res = await root.fetch(req)
    
    return res
}

const makeContext = (url: string) => {
    const nullObj = Object.create(null)
    
    nullObj.console = console
    nullObj.URL = URL
    nullObj.Response = Response
    nullObj.Buffer = Buffer
    nullObj.process = process
    nullObj.fetch = customFetch // replace global fetch function
    nullObj.btoa = btoa
    nullObj.import = makeHttpImport(url) // replace static import and dynamic import keywords

    const context = vm.createContext(nullObj)
    
    return context
}

const withLinker = (url: string, context) => async (specifier: string) => {
    // treat relative module as remote http module
    if (specifier.startsWith('./') || specifier.startsWith('../')) {
        const httpImport = makeHttpImport(url)
        const httpModule = await httpImport(specifier)

        const exportNames = Object.keys(httpModule)
        
        return new vm.SyntheticModule(exportNames, function() {
            for (const exportName of exportNames) {
                this.setExport(exportName, httpModule[exportName])
            }
        }, { context })
    }

    // all other modules should be buildin modules
    if (specifier.startsWith('node:')) {
        const builtinModule = await import(specifier)
        
        // Get all exports from the builtin module
        const exportNames = Object.keys(builtinModule)
        
        return new vm.SyntheticModule(exportNames, function() {
            for (const exportName of exportNames) {
                this.setExport(exportName, builtinModule[exportName])
            }
        }, { context })
    }
}