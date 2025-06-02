import { Hono } from 'hono'
import { renderer } from './renderer'
import api from '@routes/api/health'
import ssrPage from '@routes/view/page'
import { authRoutes } from '@services/auth'

type Bindings = {
  DATABASE_URL: string
}

export type App = Hono<{ Bindings: Bindings }>

const app = new Hono<{ Bindings: Bindings }>()

// Global renderer untuk semua route SSR
app.use('*', renderer);

// API route endpoint
app.route('/api', api);

// API Auth route endpoint
authRoutes(app);

// Handler fallback untuk semua route /api/* yang gak ketemu
app.all('/api/*', (c) => {
  const url = c.req.url
  return c.json(
    { error: `URL ${url} not found` },
    400
  )
})

// Error handler
app.onError((err, c) => {
  console.error('Unhandled Error:', err)
  return c.json({ error: (err as Error).message }, 500)
})

app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404)
})

// SSR page
app.route('/', ssrPage)

export default app
