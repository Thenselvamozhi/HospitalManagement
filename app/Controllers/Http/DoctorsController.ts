import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doctor from 'App/Models/Doctor'
import DoctorValidator from 'App/Validators/DoctorValidator'
import UpdateDoctorValidator from 'App/Validators/UpdateDoctorValidator'


export default class DoctorsController {

    public async index() {
        return await Doctor
            .query()
            .preload('department')
    }

    public async show({ params }: HttpContextContract) {
        return await Doctor
            .query()
            .where('id', params.id)
            .preload('department')
            .firstOrFail()
    }

    public async store({ request }: HttpContextContract) {
        const data = await request.validate(DoctorValidator)
        return await Doctor.create(data)
    }

    public async update({ params, request }: HttpContextContract) {

        const data = await request.validate(UpdateDoctorValidator)
        const doctor = await Doctor.findOrFail(params.id)
        doctor.merge(data)
        await doctor.save()
        return doctor
    }

    public async destroy({ params }: HttpContextContract) {
        const doctor = await Doctor.findOrFail(params.id)
        await doctor.delete()
        return {
            message: 'Doctor deleted successfully'
        }
    }
}