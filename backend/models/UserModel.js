

const mongoose = require ("mongoose")

const data =new mongoose.Schema({

name:{
    type:String,
    required:true
},
fullname:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
contact:{
    type:String,
    required:true
}

});

exports.save = mongoose.model('data',data)

