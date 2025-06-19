/**
 * a microbackend version using worker thread for isolation
 */
import { get, isolate } from "./module.js"
import { MicroWorker } from "./worker_wrapper.js"


// TODO: WTF ?! use a worker pool...
const worker = new MicroWorker()
const worker2 = new MicroWorker()
const worker3 = new MicroWorker()
const worker4 = new MicroWorker()

export default {
    async fetch(request: Request) {
        const url = new URL(request.url)

        console.log() // give me some space

        if (request.method === 'GET' && url.pathname === '/encrypt') {
            console.log(`[GET] http://localhost:3000/encrypt`)
            
            const assetUrl = 'http://localhost:8004'

            try {
                const {code, entryFile} = await get(assetUrl)
                    .catch(err => {throw new Error(`Error: Fail to fetch encrypt remote \n ${err.stack}`)})
                
                // refactor obviously...
                if (!worker.isInUse)
                    return await worker.fetch(request, code, entryFile, assetUrl)
                if (!worker2.isInUse)
                    return await worker2.fetch(request, code, entryFile, assetUrl)
                if (!worker3.isInUse)
                    return await worker3.fetch(request, code, entryFile, assetUrl)
                if (!worker4.isInUse)
                    return await worker4.fetch(request, code, entryFile, assetUrl)
                
                const response = await worker.fetch(request, code, entryFile, assetUrl)
                
                return response
            } catch (err) {
                console.log(err.message) // naive error reporting
                return new Response(err, {status: 500})
            }
        }

        if (request.method === 'GET' && url.pathname === '/algo') {
            console.log(`[GET] http://localhost:3000/algo`)

            const assetUrl = 'http://localhost:8006'
            
            try {
                const {code, entryFile} = await get(assetUrl)
                    .catch(err => {throw new Error(`Error: Fail to fetch algo remote \n ${err.stack}`)})

                const mod = await isolate(assetUrl)<any>(code, entryFile)
                    .catch(err => {
                        throw new Error(`Error: Fail to isolate algo remote \n ${err.stack}`)
                    })
    
                console.log(`[EXEC] algo microbackend`)

                const response = await mod.default.fetch(request)
                    .catch(err => {
                        throw new Error(`Error: Fail to exec algo remote \n ${err.stack}`)
                    })
                
                return response
            } catch (err) {
                console.log(err.message) // naive error reporting
                return new Response(err, {status: 500})
            }
        }

        return new Response('Not Found', {status: 404})
    }
}
