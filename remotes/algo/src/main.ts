export default {
	async fetch(request: Request) {

        const url = new URL(request.url)

        if (request.method === 'GET' && url.pathname === '/algo') {
            
            const {list} = await import('./algoStore.service' )

            const res = await list()

            return Response.json(res) 
        }

        return new Response('Not Found', {status: 404})
	}
}