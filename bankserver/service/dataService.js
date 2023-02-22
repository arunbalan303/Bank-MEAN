//impot db.js
const db=require("./db")


//import jwt
 const jwt=require('jsonwebtoken')
userDetails={
    1000:{acno:1000,username:"Varun",password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:"Arun",password:123,balance:0,transaction:[]},
    1002:{acno:1002,username:"Karun",password:123,balance:0,transaction:[]},
    1003:{acno:1003,username:"Tharun",password:123,balance:0,transaction:[]}
  }



//register

register=(acno,uname,psw)=>{
 return db.User.findOne({acno}).then(user=>{
    if(user){
      return {
        statusCode:401,
        status:false,
        message:("user already exist")
      }

    } 
    else{
      const newuser=new db.User({
        acno, 
        username:uname,
        password:psw,
        balance:0,
        transaction:[]
    
      })
      newuser.save()
      return {
        statusCode:200,
        status:true,
        message:("registration success")
      }

    }
  })
    
}
 //login
 login=(acno,psw)=>{       //if data base in password
   return db.User.findOne({acno,password:psw}).then(user=>{ 
    if(user){
      const token=jwt.sign({currentAcno:acno},'secretkey123')
      return {
        statusCode:200,
        status:true,
        message:"login success",
        currentAcno:acno, //or user.acno
        currentUser:user.username,
        token 
       }
       
    }
    else{
      return{
        statusCode:401,
        status:false,
        message:"incorrect account number or password"
      }

    }
   })
  
 
 }

 //deposit

deposit=(acno,password,amount)=>{
  var amnt=parseInt(amount)
  return db.User.findOne({acno,password}).then (user=>{
    if(user){
    
       user.balance += amnt
       user.transaction.push({type:'CREDIT',amount:amnt})
       user.save()  //used to save new changes to data base
        return {
          statusCode:200,
          status:true,
          message: `${user.balance}`
        }
      
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:"incorrect password number"
        
      }
    }
    
   
  })

}

withdraw=(acno,password,amount)=>
{ var amnt=parseInt(amount)

  return  db.User.findOne({acno,password}).then(user=>{
    if(user)
    {if(user.balance>=amnt)
    {user.balance  -=amnt
    user.transaction.push({type:'DEBIT',amount:amnt})
    user.save()
    return {
      statusCode:200,
      status:true,
      message:`${user.balance}`
      
    }}
    else{
      return {
        statusCode:401,
        status:false,
        message:"insufficent balance"
        
      }
    }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:"incorrect acno or password"
        
      }
    }
  })
}








//gettransaction
gettransaction=(acno)=>{
  return db.User.findOne({acno}).then (user=>{
    if(user){
      return {
        statusCode:200,
          status:true,
          message:user.transaction
    
      }



    }
    else{
      return{
        statusCode:401,
          status:false,
          message:"incorrect account "
    
        
      }

    }
  })
}
 acdelete=(acno)=>{
  return db.User.deleteOne({acno}).then(user=>{
    if(user){
      return {
        statusCode:200,
          status:true,
          message:"account deleted"
    

      }
    }
    else{
      return{
        statusCode:401,
          status:false,
          message:"incorrect account "
    
        
      }
      
    }
  })
 }



 
 module.exports={
    register,
    login,
    deposit,
    withdraw,
    gettransaction,acdelete

    
 }
