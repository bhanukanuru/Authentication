const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const messageSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message 