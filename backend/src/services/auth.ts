import { getConnection } from '@connection/db'
import { App } from 'index';

export const authRoutes = (app: App) => {
  app.get('/api/auth', async (c) => {
    const conn = getConnection(c.env.DATABASE_URL)

    const result = await conn.query('SELECT * FROM users') // sengaja typo
      return c.json({
        data: result.rows,
      })
  });

  /// nambah 

  /// nambah
}