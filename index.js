const express = require('express')
const setUpDb = require('./config/database')
const app= express()
const router = require('./config/routes')
const port = 3040

app.use(express.json())
app.use('/', router)
setUpDb()

app.listen(port, ()=>{
    console.log('lietening on port ', port)
})
