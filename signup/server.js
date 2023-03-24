const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan')
const path = require("path")
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./router/route');
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const database = "mongodb://127.0.0.1:27017/signup"

//database connection
mongoose.set('strictQuery', true);
mongoose.connect(database, {
    useNewUrlParser : true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('database is connected')
}),
err => {
    console.log("database is not connected" , err)
}

//static path
// const static_path = path.join(__dirname,"loginsignup/index.html")

// app.use(express.static(static_path));
//converting data into json
app.use(bodyParser.json())
app.use( bodyParser.urlencoded({
      extended: false,
    }),
  )
//setting for login session














//route path
app.use('/signup',require('./router/route'))

app.get('/',(req,res)=>{
    res.send("welcome to server")
})








app.listen(4000,()=>
{
   console.log("serer is running!")
});









