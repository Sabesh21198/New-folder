const express = require ('express');
const mongoose = require ("mongoose");
const cors = require("cors");
const route = require("./route/route");
const { urlencoded } = require('express');
const app = express();

mongoose.connect("mongodb://localhost:27017/voiceform",{
useUnifiedTopology : true,
useNewUrlParser : true,

});

const db = mongoose.connection;
db.on('error',(error)=> console.log(error));
db.once('open',()=> console.log('database connected'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(route);



app.listen(5000,()=>console.log('server is running and started at Port No:5000'));