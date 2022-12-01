const express= require('express');
const cors= require('cors');
const routerApi = require('./routes') // el busca index en automatico
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app=express();
const port = process.env.PORT || 3000;

app.use(express.json()); // nos muestra toda la info en app insomnia

const whitelist = ['file:///C:/Users/personal/desktop/my-store/frontend.html'];
const options ={
  origin: (origin, callback) =>{
    if(whitelist.includes(origin) || !origin){
      callback(null, true);

    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors());


app.get('/',(req,res) =>{
    res.send('Hola mi server en express')
})
app.get('/nueva-ruta',(req,res) =>{
  res.send('Hola soy una nueva ruta')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, ()=> {
  console.log('mi port' + port)
});
