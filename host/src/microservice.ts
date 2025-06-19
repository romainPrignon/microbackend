export default {
    async fetch(request: Request) {
        const url = new URL(request.url)

        console.log() // give me some space

        if (request.method === 'GET' && url.pathname === '/encrypt') {

            const req = new Request(new URL(url.pathname + url.search, 'http://localhost:4000'), {
                method: request.method,
            })
            
            console.log(`[EXEC] encrypt microservice`)
            const res = await fetch(req)

            return res
        }

        if (request.method === 'GET' && url.pathname === '/algo') {
            console.log(`[EXEC] algo microservice`)
            
            const req = new Request(new URL(url.pathname + url.search, 'http://localhost:6001'), {
                method: request.method,
            })
            
            const res = await fetch(req)
            
            return res
        }
        
        return new Response('Not Found', {status: 404})
    }
}
