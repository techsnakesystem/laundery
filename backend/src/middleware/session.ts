import { Claims } from "@contexts/models/auth-model"
import { Context, Next } from "hono"
import { sign, verify } from "hono/jwt"

const JWT_SECRET = 'secret'

export async function generateToken(payload: Claims) {
  return await sign(payload, JWT_SECRET)
}

export async function authMiddleware(c: Context, next: Next) {
  const token = c.req.header('Cookie')
  console.log(token)
  if (!token) return c.text('Unauthorized', 401)

  try {
    const user = await verify(token, JWT_SECRET)
    c.set('user', user)
    await next()
  } catch (e) {
    return c.text('Invalid token', 401)
  }
}