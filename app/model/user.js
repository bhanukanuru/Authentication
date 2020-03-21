const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:12
    },
    email:{
        type:String,
        required:true,
        unique: true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'Invalid Email format'
            }
        }
      
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:128
    },
    tokens:[
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
})

// pre hooks
userSchema.pre('save',function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(15)
        .then((salt)=>{
            bcryptjs.hash(this.password, salt)
            .then((encryptedPassword)=>{
                this.password = encryptedPassword
                next()
            })
        })
    }
    else{
        next()
    }
   
})

// own instance methods

userSchema.methods.generateToken=function(){
    const user = this
    const tokenData={
        _id: user._id,
        username:user.username,
        createdAt:Number(new Date())
    }
    const token= jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({
        token
    })
    console.log(token)
    return user.save()
    .then((user)=>{
        return Promise.resolve(token)
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
}

//own static methods

userSchema.statics.findByCredentials= function(email,password){
    const User= this
    return User.findOne({email})
        .then((user)=>{
            if(!user){
                return Promise.reject('Invalid Email / Password')
            }
            return bcryptjs.compare(password,user.password)
              .then((result)=>{
                    if(result){
                        return Promise.resolve(user)
                    }
                    else{
                        return Promise.reject('Invalid Email / Password')
                    }
              })

        })
        .catch((err)=>{
           return Promise.reject(err) 
           // return new Promise((resolve,reject)=>{
            // reject(err)
           //})
        })
}

userSchema.statics.findByToken=function(token){
    const User = this
    let tokenData 
    try{
        tokenData = jwt.verify(token,'jwt@123')
    }
    catch(err){
        return Promise.reject(err)
    }

    return User.findOne({
        _id: tokenData._id,
        'tokens.token':token
    })
}


const User = mongoose.model('User', userSchema)
module.exports = User