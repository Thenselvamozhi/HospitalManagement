//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class JwtAuth {

  public async handle({ request}, next) {

    const header = request.header('Authorization')

    if (!header) {
      throw new Error('TOKEN_MISSING')
    }

    const token = header.replace('Bearer ', '')

    try {
      const payload = jwt.verify(token, Env.get('JWT_SECRET'))

      request.user = payload
      console.log(payload)
    }
    catch(error) {
      throw error
    }
    await next()
  }
}