import { get, isolate } from "./module.js"

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

                const encrypt = await isolate(assetUrl)<EncryptModule>(code, entryFile)
                    .catch(err => {throw new Error(`Error: Fail to isolate encrypt remote \n ${err.stack}`)})
    
                console.log(`[EXEC] encrypt microbackend`)
                const response = await encrypt.default.fetch(request)
                    .catch(err => {throw new Error(`Error: Fail to exec encrypt remote \n ${err.stack}`)})

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

                const mod = await isolate(assetUrl)(code, entryFile)
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
                console.log(err.message)
                return new Response(err, {status: 500})
            }
        }

        return new Response('Not Found', {status: 404})
    }
}
