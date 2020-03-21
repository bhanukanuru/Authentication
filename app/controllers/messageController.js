const Message = require('../model/message')


module.exports.list=(req, res) => {
    Message.find({user:req.user._id})
    .then((message)=>{
        res.json(message)
    })
    .catch((err)=>{
        res.json(err)
    })
    
}

module.exports.create=(req,res)=>{
     const body = req.body 
    const message = new Message(body)
    console.log(req.user)
    message.user= req.user._id
    message.save()
        .then(message => res.json(message))
        .catch(err => res.json(err))
}


// router.get('/:id', authenticateUser, (req, res) => {
//     const id = req.params.id 
//     Message.findOne({
//         _id: id,
//         user: req.user._id 
//     })
//     .then(message => {
//         if(message) {
//             res.json(message)
//         } else {
//             res.json({})
//         }
//     })
// })

// put 
// Message.findOneAndUpdate({ _id: id, user: req.user._id})

// delete
// Message.findOneAndDelete({ _id: id, user: req.user._id })
