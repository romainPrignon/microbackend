# microbackend

## usecase

- call `http://localhost:3000/encrypt?content=foo` to encrypt some content
- the encrypt microservice/microbackend call another microservice/microbackend to fetch a list of good encryption algorithm
- then, it encrypt then content with the algo and secret key
- then, it return the encrypted content to the caller

## tips
play with `preserveModules` and `inlineDynamicImports` in remote vite config to load 1 or more chunks

###  how does it works ?

microservice or microbackend expose a standard winterCG/winterTC fetch interface
```ts
// remote/src/main.ts
export default {
	async fetch(request: Request) {
        return new Response('Hello World')
	}
}
```

in microservice mode, they can be run with bun, deno or any winterCG/winterTC node frameworks (hono,...)
```sh
deno serve remote/src/main.ts
```

in microbackend mode, they are first bundle with vite, then serve as static assets (like any frontend lib)
```sh
vite build
http-server dist/ # use any static server you like
```

in microservice mode, the host uses the standard `fetch` method to do a HTTP request on a microservice (nothing new !)
```ts
const res = await fetch(req)
await res.json()
```

in microbackend mode, the host
- get the remote code from the static assets server (then cache it)
- isolate the code into a node:vm, link ES module, then evaluate the code
- call the fetch function from the isolated module
```ts
// host/src/main.ts
export default {
    async fetch(request: Request) {
        const code = await get('https://cdn.io/my-super-module')
        const mod = await isolate(code)
        // call the remote/src/main.ts fetch function (locally)
        const res = await mod.default.fetch(req)
    }
}
```

### annexe

#### microservice
```d2
direction: right

user
host
encrypt
algo

user -> host: GET /encrypt
host -> encrypt: GET /encrypt
encrypt -> algo: GET /algo
```

#### microbackend
```d2
direction: right

user
server: {
  vm1: {
    encrypt
  }
  vm2: {
    algo
  }
}

user -> server.host: (1) GET /encrypt
server.host -> server.vm1.encrypt: (2) encrypt.fetch()
server.vm1.encrypt -> server.host: (3) GET /algo
server.host -> server.vm2.algo: (4) algo.fetch()

```
