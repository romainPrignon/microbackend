export default {
	async fetch(request: Request) {
        const url = new URL(request.url)
        if (request.method === 'GET' && url.pathname === '/encrypt') {
            
            const {encryptUsecase} = await import('./encrypt.usecase.ts')
            const content = await encryptUsecase(url.searchParams.get('content')!)

            return new Response(content) 
        }
        
        return new Response('Not Found', {status: 404})
	}
}