const express = require('express')

const user = require('../Controllers/UserController')



const router = express.Router()

router.post('/datas',user.saveUser);

router.get('/hi',(req,res)=>{
    res.send("hi")
})


module.exports = router