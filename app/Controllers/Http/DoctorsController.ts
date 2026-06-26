import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doctor from 'App/Models/Doctor'
import DoctorValidator from 'App/Validators/DoctorValidator'
import UpdateDoctorValidator from 'App/Validators/UpdateDoctorValidator'

export default class DoctorsController {
  public async index() {
    try {
      return await Doctor
        .query()
        .preload('department')
    } catch (error) {
      throw error
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      return await Doctor
        .query()
        .where('id', params.id)
        .preload('department')
        .firstOrFail()
    } catch (error) {
      throw error
    }
  }

  public async store({ request }: HttpContextContract) {
    try {
      const data = await request.validate(DoctorValidator)
      return await Doctor.create(data)
    } catch (error) {
      throw error
    }
  }

  public async update({ params, request }: HttpContextContract) {
    try {
      const data = await request.validate(UpdateDoctorValidator)
      const doctor = await Doctor.findOrFail(params.id)
      doctor.merge(data)
      await doctor.save()
      return doctor
    } catch (error) {
      throw error
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const doctor = await Doctor.findOrFail(params.id)
      await doctor.delete()
      return {
        message: 'Doctor deleted successfully'
      }
    } catch (error) {
      throw error
    }
  }
}