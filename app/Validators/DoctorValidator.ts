import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DoctorValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    firstName: schema.string({}, [
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(50),
      rules.regex(/^[A-Za-z ]+$/),
    ]),

    lastName: schema.string({}, [
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(50),
      rules.regex(/^[A-Za-z ]+$/),
    ]),

    specialization: schema.string({}, [
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(100),
    ]),

    phone: schema.string({}, [
      rules.regex(/^[0-9]{10}$/),
    ]),

    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({
        table: 'doctors',
        column: 'email',
      }),
    ]),

    consultationFee: schema.number([
      rules.range(1, 100000),
    ]),

    departmentId: schema.number([
      rules.exists({
        table: 'departments',
        column: 'id',
      }),
    ]),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required',

    minLength:
      '{{ field }} must contain at least {{ options.minLength }} characters',

    maxLength:
      '{{ field }} cannot exceed {{ options.maxLength }} characters',

    email:
      '{{ field }} must be a valid email address',

    range:
      '{{ field }} must be between {{ options.start }} and {{ options.stop }}',

    'phone.regex':
      'Phone number must contain exactly 10 digits',

    'firstName.regex':
      'First name can contain only letters and spaces',

    'lastName.regex':
      'Last name can contain only letters and spaces',

    'departmentId.exists':
      'Selected department does not exist',
  }
}