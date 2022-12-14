
const express= require('express');
const UserService = require('./../services/user.service');
const validatorHandler=require('./../middlewares/validator.handler')
const {createUserSchema,updateUserSchema,getUserSchema}=require('./../schemas/user.schema')

const router = express.Router();
const service = new UserService();

router.get('/',async (req,res) =>{
 const users =await service.find();
 res.json(users )
})

router.get('/:id',
validatorHandler(getUserSchema,'params'),
async (req, res, next)=>{
  try{
    const {id}= req.params;
    const category =await service.findOne(id);
    res.json(category)

  }catch(error){
    next(error);
  }
});

router.post('/',
  validatorHandler(createUserSchema,'body'),
async (req,res)=>{
  const body = req.body;
  const newCategory=await service.creates(body);
  res.status(201).json(newCategory);

})

router.patch('/:id',
validatorHandler(getUserSchema,'params'),
  validatorHandler(updateUserSchema,'body'),
async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body= req.body;
    const product = await service.update(id, body);
    res.json(product)
  } catch(error){
    next(error)
  }

})

router.delete('/:id',async (req,res)=>{
  const {id} = req.params;
  const rta=await service.delete(id);
  res.json(rta)
})

module.exports = router;
