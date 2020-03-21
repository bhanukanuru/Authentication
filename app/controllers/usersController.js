const User = require('../model/user')
const pick= require('lodash/pick')


module.exports.list=(req,res)=>{
    User.find()
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        res.json(err)
    })
}
/// Register
module.exports.create=(req,res)=>{
    const body = req.body
    const user = new User(body)
    console.log(user.isNew)
    user.save()
   .then((user)=>{
      //  console.log(user.isNew)
        res.json(_.pick(user,['_id','username','email']))
    })
    .catch((err)=>{
        res.json(err)
    })
}

// User Login
module.exports.login=(req,res)=>{
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then((user)=>{
          return user.generateToken()
        })
        .then((token)=>{
            res.setHeader('x-auth',token).json({})
       //  res.json(token)
        })
        .catch((err)=>{
            res.json(err)
        })
   
}

module.exports.account=(req,res)=>{
   const {user} = req
    res.json(_.pick(user,['_id','username','email']))
}


module.exports.logout=(req,res)=>{
    const {user, token} = req
    User.findByIdAndUpdate(user._id, { $pull: {tokens:{token:token}}})
    .then(()=>{
        res.json({notice:'Succesfully Logged out'})
    })
    .catch((err)=>{
        res.json(err)
    })
}

//Login
 // User.findOne({email:body.email})
    // .then((user)=>{
    //     if(!user){
    //         res.status('404').send('Invalid Email / Password')
    //     }
    //    bcryptjs.compare(body.password,user.password)
    //    .then((result)=>{
    //         if(result){
    //             res.json(user)
    //         }
    //         else{
    //             res.status('404').send('Invalid Email / Password')
    //         }
    //    })
    // })
    // .catch((err)=>{
    //     res.json(err)
    // })