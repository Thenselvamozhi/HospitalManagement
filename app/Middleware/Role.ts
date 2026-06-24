//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {

  public async handle({ request}, next, allowedRoles: string[]) {

    const user = request['user']
    console.log(user)

    console.log('User Role:', user.role)
    console.log('Allowed Roles:', allowedRoles)

    if (!allowedRoles.includes(user.role)) {
      throw new Error('ACCESS_DENIED')
    }
    await next()
  }
}