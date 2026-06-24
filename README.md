# HospitalManagement
A RESTful Hospital Management System API developed using AdonisJS v5 and PostgreSQL featuring CRUD operations, model relationships, request validation, JWT authentication, role-based access control, and centralized exception handling.

## Features

### Patient Management

* Create Patient
* Get All Patients
* Get Patient By ID
* Update Patient
* Delete Patient

### Department Management

* Create Department
* Get All Departments
* Get Department By ID
* Update Department
* Delete Department

### Doctor Management

* Create Doctor
* Get All Doctors
* Get Doctor By ID
* Update Doctor
* Delete Doctor

### Authentication

* User Registration
* User Login
* JWT Token Generation
* Protected Routes

### Authorization

* Role Based Access Control

Supported Roles:

* ADMIN
* DOCTOR
* RECEPTIONIST

### Validation

* Request Validation using Adonis Validators
* Custom Validation Messages
* Email Validation
* Phone Validation
* Foreign Key Validation
* Enum Validation

### Relationships

* Department has many Doctors
* Doctor belongs to Department

### Global Exception Handling

* Validation Errors
* Resource Not Found Errors
* Authentication Errors
* Authorization Errors

---

## Tech Stack

* AdonisJS v5
* TypeScript
* PostgreSQL
* Lucid ORM
* JWT Authentication
* Argon2 Password Hashing

---

## Project Structure

app/

├── Controllers/Http/

│   ├── PatientsController.ts

│   ├── DoctorsController.ts

│   ├── DepartmentsController.ts

│   └── AuthController.ts

│

├── Models/

│   ├── Patient.ts

│   ├── Doctor.ts

│   ├── Department.ts

│   └── User.ts

│

├── Validators/

│   ├── PatientValidator.ts

│   ├── UpdatePatientValidator.ts

│   ├── DoctorValidator.ts

│   ├── UpdateDoctorValidator.ts

│   ├── DepartmentValidator.ts

│   ├── UpdateDepartmentValidator.ts

│   ├── RegisterValidator.ts

│   └── LoginValidator.ts

│

├── Middleware/

│   ├── JwtAuth.ts

│   └── Role.ts

│

└── Exceptions/

```
└── Handler.ts
```

---

## Database Tables

### Patients

| Column        | Type    |
| ------------- | ------- |
| id            | Integer |
| first_name    | String  |
| last_name     | String  |
| gender        | Enum    |
| date_of_birth | Date    |
| phone         | String  |
| email         | String  |
| address       | String  |
| blood_group   | String  |

### Departments

| Column          | Type    |
| --------------- | ------- |
| id              | Integer |
| department_name | String  |
| description     | String  |

### Doctors

| Column           | Type        |
| ---------------- | ----------- |
| id               | Integer     |
| first_name       | String      |
| last_name        | String      |
| specialization   | String      |
| phone            | String      |
| email            | String      |
| consultation_fee | Decimal     |
| department_id    | Foreign Key |

### Users

| Column   | Type    |
| -------- | ------- |
| id       | Integer |
| name     | String  |
| email    | String  |
| password | String  |
| role     | Enum    |

---

## Authentication Flow

Register
↓
Hash Password
↓
Store User
↓
Login
↓
Verify Password
↓
Generate JWT
↓
Access Protected Routes

---

## Authorization Rules

### ADMIN

* Create Patients
* View Patients
* Update Patients
* Delete Patients

### DOCTOR

* View Patients

### RECEPTIONIST

* Create Patients
* View Patients
* Update Patients

---

## API Endpoints

### Authentication

POST /register

POST /login

GET /me

---

### Patients

GET /patients

GET /patients/:id

POST /patients

PUT /patients/:id

DELETE /patients/:id

---

### Departments

GET /departments

GET /departments/:id

POST /departments

PUT /departments/:id

DELETE /departments/:id

---

### Doctors

GET /doctors

GET /doctors/:id

POST /doctors

PUT /doctors/:id

DELETE /doctors/:id

---

## Environment Variables

Create a .env file:

DB_CONNECTION=pg

PG_HOST=localhost

PG_PORT=5432

PG_USER=postgres

PG_PASSWORD=your_password

PG_DB_NAME=hospital_management

JWT_SECRET=your_secret_key

---

## Installation

Install dependencies:

npm install

Run migrations:

node ace migration:run

Start server:

node ace serve --watch

---

## Current Learning Progress

Completed:

* CRUD Operations
* Lucid Models
* Migrations
* Relationships
* Validation
* JWT Authentication
* Authorization
* Middleware
* Global Exception Handling

Upcoming:

* Custom Exceptions
* Pagination
* Query Filters
* Service Layer Architecture
* Advanced Authorization
