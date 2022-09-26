const User = require('../models/UserModel')


module.exports.saveUser = async (req,res) =>
{
    console.log(req.body)
    console.log(res.status)
    const data = User.save(req.body);
    try{
        const inserteduser = await data.save();
        res.status(201).json(inserteduser);
    }
    catch (error) {
        res.status(400).json({message : error.message})
    }
}
