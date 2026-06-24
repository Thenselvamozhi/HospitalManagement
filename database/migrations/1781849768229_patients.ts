import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Patients extends BaseSchema {
  protected tableName = 'patients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.enum('gender', ['M', 'F', 'O']).notNullable()
      table.date('date_of_birth').notNullable()
      table.string('phone', 10).notNullable()
      table.string('email',100)
      table.string('address', 100)
      table.string('blood_group', 7).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
