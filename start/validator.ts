/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
// start/validator.ts

import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('uppercase', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  if (value !== value.toUpperCase()) {
    options.errorReporter.report(
      options.pointer,
      'uppercase',
      'uppercase validation failed',
      options.arrayExpressionPointer
    )
  }
})