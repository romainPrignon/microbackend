import { parentPort } from 'node:worker_threads'
import { isolate } from './module.js'

const _fetch = async (request, code, entryFile, assetUrl) => {
    // isolate the code in a node:vm within a node:worker_threads
    const mod: any = await isolate(assetUrl)(code, entryFile)
        .catch(err => {throw new Error(`Error: Fail to isolate remote \n ${err.stack}`)})

    // call its fetch method
    const response = await mod.default.fetch(request)
        .catch(err => {throw new Error(`Error: Fail to exec encrypt remote \n ${err.stack}`)})

    return response
}

const serializeResponse = async (response: Response) => {
    return JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: await response.text()
    })
}

parentPort.on('message', async (message) => {
    try {
        if (message.type === 'fetch') {
            const {request, code, entryFile, assetUrl} = JSON.parse(message.payload)

            const res = await _fetch(request, code, entryFile, assetUrl)
            
            parentPort.postMessage(await serializeResponse(res))
        }
    } catch (err) {
        parentPort.postMessage(err.message)
    }
})