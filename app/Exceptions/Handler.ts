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
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {

    console.log('ERROR CODE:', error.code)
    console.log('ERROR NAME:', error.name)

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send({
        success: false,
        message: 'Validation failed',
        errors: error.messages.errors,
      })
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).send({
        success: false,
        message: 'Resource not found',
      })
    }

    if (error.code === 'INVALID_CREDENTIALS') {
      return ctx.response.status(401).send({
        success: false,
        message: 'Invalid credentials',
      })
    }

    if (error.code === 'TOKEN_MISSING') {
      return ctx.response.status(401).send({
        success: false,
        message: 'Authorization token is required',
      })
    }

    if (error.code === 'ACCESS_DENIED') {
      return ctx.response.status(403).send({
        success: false,
        message: 'Access denied',
      })
    }

    if (error.name === 'JsonWebTokenError') {
      return ctx.response.status(401).send({
        success: false,
        message: 'Invalid token',
      })
    }

    if (error.name === 'TokenExpiredError') {
      return ctx.response.status(401).send({
        success: false,
        message: 'Token expired',
      })
    }

    Logger.error(error)

    return ctx.response.status(500).send({
      success: false,
      message: 'Internal server error',
    })
  }
}