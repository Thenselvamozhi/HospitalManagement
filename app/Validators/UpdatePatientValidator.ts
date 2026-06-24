import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePatientValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    firstName: schema.string.optional({}, [
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(50),
      rules.regex(/^[A-Za-z ]+$/),
    ]),

    lastName: schema.string.optional({}, [
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(50),
      rules.regex(/^[A-Za-z ]+$/),
    ]),

    gender: schema.enum.optional(['M', 'F', 'O'] as const),

    dateOfBirth: schema.date.optional({}, [
      rules.before('today'),
    ]),

    phone: schema.string.optional({}, [
      rules.regex(/^[0-9]{10}$/),
    ]),

    email: schema.string.optional({}, [
      rules.email(),
    ]),

    address: schema.string.optional({}, [
      rules.maxLength(255),
    ]),

    bloodGroup: schema.string.optional({}, [
      rules.maxLength(7),
      rules.uppercase()
    ]),
})
  public messages: CustomMessages = {
    minLength:
    '{{ field }} must contain at least {{ options.minLength }} characters',

    maxLength:
      '{{ field }} cannot exceed {{ options.maxLength }} characters',

    enum:
      '{{ field }} must be one of {{ options.choices }}',

    email:
      '{{ field }} must be a valid email address',

    'phone.regex':
      'Phone number must contain exactly 10 digits',

    'firstName.regex':
      'First name can contain only letters and spaces',

    'lastName.regex':
      'Last name can contain only letters and spaces',
  }
}
