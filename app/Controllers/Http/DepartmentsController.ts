import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'
import DepartmentValidator from 'App/Validators/DepartmentValidator'
import UpdateDepartmentValidator from 'App/Validators/UpdateDepartmentValidator'

export default class DepartmentsController {

  public async index() {
    try {
      return await Department
        .query()
        .preload('doctors')
    } catch (error) {
      throw error
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      return await Department.findOrFail(params.id)
    } catch (error) {
      throw error
    }
  }

  public async store({ request }: HttpContextContract) {
    try {
      const data = await request.validate(DepartmentValidator)
      return await Department.create(data)
    } catch (error) {
      throw error
    }
  }

  public async update({ params, request }: HttpContextContract) {
    try {
      const data = await request.validate(UpdateDepartmentValidator)
      const department = await Department.findOrFail(params.id)
      department.merge(data)
      await department.save()
      return department
    } catch (error) {
      throw error
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const department = await Department.findOrFail(params.id)
      await department.delete()
      return {
        message: 'Department deleted successfully'
      }
    } catch (error) {
      throw error
    }
  }
}