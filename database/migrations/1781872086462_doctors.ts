import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Doctors extends BaseSchema {
  protected tableName = 'doctors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.string('specialization', 100).notNullable()
      table.string('phone', 10)
      table.string('email', 100)
      table.decimal('consultation_fee', 10, 2).notNullable()

      table.integer('department_id').unsigned().notNullable().references('id').inTable('departments')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
