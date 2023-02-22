//import cors
const cors=require('cors')


//import data service file from service folder
const dataservice=require("./service/dataService")

//import json webtoken
const jwt=require('jsonwebtoken')

//  import express
const express =require('express')
const { json } = require("express")

// create an app
const app=express()

//only below the app creat section connect to the frontend
app.use(cors({orgin:'http://localhost:4200'}))

// to convert json datas
app.use(express.json()) 

//middleware for verify token
const jwtmiddleware=(req,res,next)=>{
    console.log("router specific middleware.....");
    try{
         const token=req.headers['access-token']
         const data=jwt.verify(token,"secretkey123")
         console.log(data);
         next()
    }
    catch{
    res.status(432) .json(  {
            statusCode:432,
            status:false,
            message:"please login"
        })
    }
}

// //request 
// //get -- to acess data
// app.get('/',(req,res)=>{res.send('get method checking')})
// //POST --- to data to database
// app.post('/',(req,res)=>{res.send('post method checking')})

// //DELETE
// app.delete('/',(req,res)=>{res.send('delete method checking')})

// //PUT  --- to update 
// app.put('/',(req,res)=>{res.send('put method checking')})

// //PATCH
// app.patch('/',(req,res)=>{res.send('patch method checking')})

// 



//register

app.post('/register',(req,res)=>{
    dataservice.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
   
})

//login
app.post('/login',(req,res)=>{
   dataservice.login(req.body.acno,req.body.psw).then(result=>{
    res.status(result.statusCode).json(result)
   })
})
//deposit
app.post('/deposit',jwtmiddleware,(req,res)=>{
    dataservice.deposit(req.body.acno,req.body.psw,req.body.amount).then(result=>{
    res.status(result.statusCode).json(result)
    })
})
//withdarw
app.post('/withdraw',jwtmiddleware,(req,res)=>{
    dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount).then(result=>{
    res.status(result.statusCode).json(result)
    })
   
})
//gettransaction

app.post('/gettransaction',jwtmiddleware,(req,res)=>{
    dataservice.gettransaction(req.body.acno).then(result=>{
    res.status(result.statusCode).json(result)
    })
   
})

// set port number
app.listen(3000,()=>{console.log("server start at a port number 3000");})

//delete                we use it in params
                         //
app.delete('/deleteacc/:acno',jwtmiddleware,(req,res)=>{
    dataservice.acdelete(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})