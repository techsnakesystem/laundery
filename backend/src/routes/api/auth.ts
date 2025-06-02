import connection from '@connection/db'
import { Hono } from 'hono'

const authRoute = new Hono()

authRoute.get('/users', async (c) => {
  const result = await connection.query('SELECT id, name FROM users')
  return c.json(result.rows)
})

export default authRoute
