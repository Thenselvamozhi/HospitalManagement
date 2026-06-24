import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Doctor from './Doctor'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName: 'departmentName'})
  public departmentName: string

  @column()
  public description!: string

  @hasMany(() => Doctor)
    public doctors: HasMany<typeof Doctor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}