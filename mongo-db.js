const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:Admin11278@cheloneo.zobli.mongodb.net/minimarket?retryWrites=true&w=majority";

mongoose.connect(process.env.BD_CN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res)=>{console.log("database on fire")})