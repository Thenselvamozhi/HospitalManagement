import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class PatientSearchValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    id: schema.number.optional([
      rules.unsigned(),
    ]),

    gender: schema.enum.optional(
      ['M', 'F', 'O'] as const
    ),

    bloodGroup: schema.string.optional({}, [
      rules.maxLength(7),
      rules.uppercase(),
    ]),

    firstName: schema.string.optional({}, [
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(50),
      rules.regex(/^[A-Za-z ]+$/),
    ]),

    phone: schema.string.optional({}, [
      rules.regex(/^[0-9]{10}$/),
    ]),

    sortBy: schema.enum.optional(
      [
        'id',
        'first_name',
        'last_name',
        'created_at',
        'date_of_birth',
      ] as const
    ),

    order: schema.enum.optional(
      ['asc', 'desc'] as const
    ),

    page: schema.number.optional([
      rules.unsigned(),
    ]),

    limit: schema.number.optional([
      rules.range(1, 100),
    ]),
  })

  public messages: CustomMessages = {

    'id.unsigned':
      'Id must be a positive number',

    'gender.enum':
      'Gender must be M, F or O',

    'bloodGroup.maxLength':
      'Blood group cannot exceed 7 characters',

    'firstName.minLength':
      'First name must contain at least 2 characters',

    'firstName.maxLength':
      'First name cannot exceed 50 characters',

    'firstName.regex':
      'First name can contain only letters and spaces',

    'phone.regex':
      'Phone number must contain exactly 10 digits',

    'sortBy.enum':
      'Invalid field specified for sorting',

    'order.enum':
      'Order must be either asc or desc',

    'page.unsigned':
      'Page must be greater than or equal to 0',

    'limit.range':
      'Limit must be between 1 and 100',
  }
}