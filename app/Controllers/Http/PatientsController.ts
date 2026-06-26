import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PatientValidator from 'App/Validators/PatientValidator'
import UpdatePatientValidator from 'App/Validators/UpdatePatientValidator'
import Patient from 'App/Models/Patient'
import PatientSearchValidator from 'App/Validators/PatientSearchValidator'

export default class PatientsController {

  public async store({ request }: HttpContextContract) {
    try {
      console.log(request.all())
      const data = await request.validate(PatientValidator)
      return await Patient.create(data)
    } catch (error) {
      throw error
    }
  }

  public async index() {
    try {
      return await Patient.all()
    } catch (error) {
      throw error
    }
  }

  public async search({ request }: HttpContextContract) {
    try {
      const {id, gender, bloodGroup, firstName, phone, 
        sortBy, 
        order, 
        page, 
        limit, } = await request.validate(PatientSearchValidator)

      const query = Patient.query()

      if (id) {
        query.where('id', id)
      }

      if (gender) {
        query.where('gender', gender)
      }

      if (bloodGroup) {
        query.where('blood_group', bloodGroup)
      }

      if (firstName) {
        query.whereRaw('first_name ILIKE ?', [`%${firstName}%`])
      }

      if (phone) {
        query.where('phone', phone)
      }

      if (sortBy) {
        query.orderBy(sortBy, order || 'asc')
      }

      if (page || limit) {
        return await query.paginate(
          Number(page || 1),
          Number(limit || 10)
        )
      }
      return await query
    } catch (error) {
      throw error
    }
  }

  public async update({ params, request }: HttpContextContract) {
    try {
      const data = await request.validate(UpdatePatientValidator)
      const patient = await Patient.findOrFail(params.id)
      patient.merge(data)
      await patient.save()
      return patient
    } catch (error) {
      throw error
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const patient = await Patient.findOrFail(params.id)
      await patient.delete()
      return {
        message: 'Patient deleted successfully',
      }
    } catch (error) {
      throw error
    }
  }
}