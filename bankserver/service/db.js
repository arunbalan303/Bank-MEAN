//server mbdb integration


//1. import mongoose
const mongoose=require('mongoose')

//2. state connection string  via mongoose
mongoose.connect('mongodb://localhost:27017/bankServer',{useNewUrlParser:true})

//3. define a bank database model
      //users are used in mcdb collection name in this section we use the singular of that User and 1st letter must be capital
const User=mongoose.model('User',{
    acno:Number, 
    username:String,
    password:Number,
    balance:Number,
    transaction:[]

})

//4.export  the schema to use in another file
module.exports={
    User
}
