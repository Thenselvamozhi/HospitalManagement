//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PatientValidator from 'App/Validators/PatientValidator'
import UpdatePatientValidator from 'App/Validators/UpdatePatientValidator'
import Patient from 'App/Models/Patient'

export default class PatientsController {

    public async store({ request }) {
        console.log(request.all())
        const data = await request.validate(PatientValidator)
        return await Patient.create(data)
    }

    public async index(){
        return await Patient.all()
    }

    public async show({ params }) {
        return await Patient.findOrFail(params.id)
    }

    public async update({ params, request }) {
        const data = await request.validate(UpdatePatientValidator)
        const patient = await Patient.findOrFail(params.id)
        patient.merge(data)
        await patient.save()
        return patient
    }

    public async destroy({ params }) {
        const patient = await Patient.findOrFail(params.id)
        await patient.delete()

        return {message: 'Patient deleted successfully'}
    }
}
