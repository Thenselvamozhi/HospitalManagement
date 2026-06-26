/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { Welcome: 'Hospital Management System' }
})

// Public Routes
Route.post('/register', 'AuthController.register');
Route.post('/login', 'AuthController.login');

// Protected Routes
Route.group(() => {
  Route.get('/me', 'AuthController.me');
  // Patients
  Route.group(() => {
    Route.get('/patients', 'PatientsController.index');
    Route.get('/patients/search', 'PatientsController.search');
  }).middleware(['role:ADMIN,DOCTOR,RECEPTIONIST']);

  Route.group(() => {
    Route.post('/patients', 'PatientsController.store')
    Route.put('/patients/:id', 'PatientsController.update')
    Route.patch('/patients/:id', 'PatientsController.patch')
  }).middleware(['role:ADMIN,RECEPTIONIST'])

  Route.delete('/patients/:id', 'PatientsController.destroy')
    .middleware(['role:ADMIN'])

  // Departments
  Route.group(() => {
    Route.get('/departments', 'DepartmentsController.index')
    Route.get('/departments/:id', 'DepartmentsController.show')
  }).middleware(['role:ADMIN,DOCTOR,RECEPTIONIST'])

  Route.group(() => {
    Route.post('/departments', 'DepartmentsController.store')
    Route.put('/departments/:id', 'DepartmentsController.update')
    Route.patch('/departments/:id', 'DepartmentsController.patch')
    Route.delete('/departments/:id', 'DepartmentsController.destroy')
  }).middleware(['role:ADMIN'])

  // Doctors
  Route.group(() => {
    Route.get('/doctors', 'DoctorsController.index')
    Route.get('/doctors/:id', 'DoctorsController.show')
  }).middleware(['role:ADMIN,DOCTOR,RECEPTIONIST'])

  Route.group(() => {
    Route.post('/doctors', 'DoctorsController.store')
    Route.put('/doctors/:id', 'DoctorsController.update')
    Route.patch('/doctors/:id', 'DoctorsController.patch')
    Route.delete('/doctors/:id', 'DoctorsController.destroy')
  }).middleware(['role:ADMIN'])

})
.middleware('jwt')