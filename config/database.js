const mongoose = require('mongoose')

const setUpDb=()=>{
    
     mongoose.connect('mongodb://localhost:27017/hello')
    .then(()=>{
         console.log('conected to db')
     })
     .catch((err)=>{
        console.log(err)
     })
}
module.exports= setUpDb