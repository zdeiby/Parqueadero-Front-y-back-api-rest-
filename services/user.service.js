const boom = require('@hapi/boom');

//const getConnection = require('../libs/postgres')
const { models } = require('./../libs/sequelize');
const sequelize = require('../libs/sequelize')

class UserService{
  constructor(){

  }

 async creates(data){
  const newUser = await models.user.create(data);
   return newUser;

  }
 async find(){


  const user = await models.user.findAll();
  return user

  }
  async findOne(id){

    //const user = await models.user;

   const user = await models.user.findByPk(id);
   //if(!user){
      //boom.notFound('user not found')
   // }
   return user
  }
  async update(id,changes){
    const user = await this.findOne(id);
   const rta = await user.update(changes);
    return rta;
  }
 async delete(id){

  const user = await this.findOne(id)
  await user.destroy();
  return{ id }

  }

}

module.exports= UserService;
