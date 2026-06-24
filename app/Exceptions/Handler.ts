/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }
  public async handle(error, ctx) {

    console.log('ERROR CODE:', error.code)
    console.log('ERROR MESSAGE:', error.message)

  if (error.code === 'E_ROW_NOT_FOUND') {
    return ctx.response.status(404).send({
      message: 'Row does not exist'
    })
  }

  if (error.code === 'E_VALIDATION_FAILURE') {
    return ctx.response.status(422).send({
      message: 'Validation failed',
      errors: error.messages
    })
  }

  if (error.message === 'INVALID_CREDENTIALS') {
    return ctx.response.status(401).send({
      success: false,
      message: 'Invalid credentials'
    })
  }

  if (error.message === 'TOKEN_MISSING') {
    return ctx.response.status(401).send({
      success: false,
      message: 'Authorization token is required'
    })
  }

  if (error.message === 'ACCESS_DENIED') {
    return ctx.response.status(403).send({
      success: false,
      message: 'Access denied'
    })
  }

  if (error.name === 'JsonWebTokenError') {
    return ctx.response.status(401).send({
      success: false,
      message: 'Invalid token'
    })
  }

  if (error.name === 'TokenExpiredError') {
    return ctx.response.status(401).send({
      success: false,
      message: 'Token expired'
    })
  }

  return super.handle(error, ctx)
}
}