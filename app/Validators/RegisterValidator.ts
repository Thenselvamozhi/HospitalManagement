import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(100),
    ]),

    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),

    password: schema.string({}, [
      rules.minLength(8),
      rules.maxLength(50),
    ]),

    role: schema.enum([
      'ADMIN',
      'DOCTOR',
      'RECEPTIONIST',
    ] as const),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required',

    minLength:
      '{{ field }} must contain at least {{ options.minLength }} characters',

    maxLength:
      '{{ field }} cannot exceed {{ options.maxLength }} characters',

    email:
      '{{ field }} must be a valid email address',

    enum:
      '{{ field }} must be one of {{ options.choices }}',

    'email.unique':
      'This email is already registered',
  }
}