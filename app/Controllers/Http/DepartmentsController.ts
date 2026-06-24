import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'
import DepartmentValidator from 'App/Validators/DepartmentValidator'
import UpdateDepartmentValidator from 'App/Validators/UpdateDepartmentValidator'

export default class DepartmentsController {
    public async index() {
            return await Department
                .query()
                .preload('doctors')
    }

    public async show({ params }: HttpContextContract) {
        return await Department.findOrFail(params.id)
    }

    public async store({ request }: HttpContextContract) {
        const data = await request.validate(DepartmentValidator)
        return await Department.create(data)
    }

    public async update({ params, request }: HttpContextContract) {
        const data = await request.validate(UpdateDepartmentValidator)
        const department = await Department.findOrFail(params.id)
        department.merge(data)
        await department.save()
        return department
    }

    public async destroy({ params }: HttpContextContract) {
        const department = await Department.findOrFail(params.id)
        await department.delete()
        return {
            message: 'Department deleted successfully'
        }
    }
}