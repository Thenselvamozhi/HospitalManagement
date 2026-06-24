import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    departmentName: schema.string({}, [
      rules.trim(),
      rules.minLength(3),
      rules.maxLength(100),
    ]),

    description: schema.string.optional({}, [
      rules.maxLength(255),
    ]),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required',

    minLength:
      '{{ field }} must contain at least {{ options.minLength }} characters',

    maxLength:
      '{{ field }} cannot exceed {{ options.maxLength }} characters',
  }
}