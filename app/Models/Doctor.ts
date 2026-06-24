import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'

export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName: 'first_name'})
  public firstName: string

  @column({columnName: 'last_name'})
  public lastName: string

  @column()
  public specialization: string

  @column()
  public phone: string

  @column()
  public email: string

  @column({columnName: 'consultation_fee'})
  public consultationFee: number

  @column()
  public departmentId: number

  @belongsTo(() => Department)
  public department: BelongsTo<typeof Department>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
