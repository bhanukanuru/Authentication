const express = require('express')
const router = express.Router()
const usersController  = require('../app/controllers/usersController')
const authenticateUser = require('../app/middleware/authenticateUser')
const messageController = require('../app/controllers/messageController')



router.post('/users/register', usersController.create)
router.post('/users/login', usersController.login)
router.get('/users', usersController.list)
router.get('/users/account', authenticateUser, usersController.account)
router.delete('/logout', authenticateUser, usersController.logout)

router.get('/messages', authenticateUser, messageController.list)
router.post('/messages', authenticateUser, messageController.create)



module.exports = router