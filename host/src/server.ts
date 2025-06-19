import { serve } from '@hono/node-server'
import microservice from './microservice.js'
import microbackend from './microbackend.js'
import microworker from './microbackend_worker.js'

const mode = process.argv.pop()
let _fetch

if (mode === 'microservice') {
  _fetch = microservice.fetch
}

if (mode === 'microbackend') {
  _fetch = microbackend.fetch
}

if (mode === 'microbackend_worker') {
  _fetch = microworker.fetch
}

serve({
  fetch: _fetch,
  port: 3000,
},(info) => {
  console.log(`listening on http://localhost:${info.port}...`)
})