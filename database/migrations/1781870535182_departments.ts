import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Departments extends BaseSchema {
  protected tableName = 'departments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('departmentName', 100)
        .notNullable()
        .unique()

      table.text('description')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}