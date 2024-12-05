import { Table, Column, Model, DataType, IsEmail, AllowNull } from 'sequelize-typescript'

@Table({
  tableName: 'Users',
  timestamps: false
})

class Users extends Model {

  @Column({
    type: DataType.STRING(255),
    primaryKey: true,
    allowNull: false
  })
  declare userID: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare role: string;

  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;



}

export default Users;
