const {Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE='users';

const UserSchema = {
  id: {
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull:false,
    type: DataTypes.STRING,
    unique:false,
  },
  password:{
    allowNull:false,
    type:DataTypes.STRING,
    defaultValue: ' customer'
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING

  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate(){

  }
  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName:  'user',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
