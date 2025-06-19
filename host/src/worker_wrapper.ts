import { Worker } from 'node:worker_threads'
import * as path from 'node:path'

export class MicroWorker {
    worker: Worker
    isInUse: boolean = false

    constructor() {
        const workerPath = path.resolve('./dist/worker.js')

        this.worker = new Worker(workerPath)
    }

    fetch = (request: Request, code: string, entryFile: any, assetUrl: string) => {
        
        this.isInUse = true
        
        return new Promise((resolve, reject) => {
            const onMessage = (message) => {
                const res = JSON.parse(message)

                resolve(new Response(res.body))
                
                this.isInUse = false
            }

            const onError = (err) => {
                reject(err)

                this.isInUse = false
            }

            this.worker.on('message', onMessage)
            this.worker.on('error', onError)

            this.worker.postMessage({
                type: 'fetch',
                payload: JSON.stringify({
                    request: {
                        method: request.method,
                        url: request.url,
                        headers: request.headers,
                        body: request.body,
                    },
                    code,
                    entryFile,
                    assetUrl
                })
            })
        })
    }

    stop = async () => {
        await this.worker.terminate()
    }
}
