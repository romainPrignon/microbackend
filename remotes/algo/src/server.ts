import { serve } from '@hono/node-server'
import main from './main'

serve({
  fetch: main.fetch,
  port: 6001,
},(info) => {
  console.log(`listening on http://localhost:${info.port}...`)
})