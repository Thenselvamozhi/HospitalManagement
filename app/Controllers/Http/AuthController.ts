// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

import RegisterValidator from 'App/Validators/RegisterValidator'
import LoginValidator from 'App/Validators/LoginValidator'


export default class AuthController {
    public async register({ request, response }) {
        const data = await request.validate(RegisterValidator)
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: await Hash.make(data.password),
            role: data.role, })

        return response.created({
            message: 'User registered successfully',
            user
        })
    }

   public async login({request}) {
    
    const data = await request.validate(LoginValidator)
    const user = await User.findBy( 'email', data.email )

    if (!user) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const verified = await Hash.verify(user.password, data.password)

    if (!verified) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        Env.get('JWT_SECRET'),
        {expiresIn: '1d',}
        )
        return {token,}
    }

    public async me({request}) {
        return request['user']
    }
}
