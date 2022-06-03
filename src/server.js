const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
// const fileUpload = require('express-fileupload')
const fs= require('fs-extra');
const cookieParser= require('cookie-parser');


//SETTINGS
app.set("port",4000 || process.env.PORT)


//MIDLEWARES
app.use(morgan('dev'));
app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended:false }))
// app.use(fileUpload({
//     useTempFiles: true,
// }));



//Database
require('./database');





//Routes
app.use('/user',require('./Routes/user.routes'))
app.use('/api',require('./Routes/category.routes'))
// app.use('/api',require('./routes/upload.routes'))
// app.use('/api',require('./routes/product.routes'))








module.exports = app;










































