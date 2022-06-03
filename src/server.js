const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const fs= require('fs-extra');
const cookieParser= require('cookie-parser');


//SETTINGS
app.set("PORT", process.env.PORT || 4000)


//MIDLEWARES
app.use(morgan('dev'));
app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended:false }))



//Database
require('./database');



//Routes
app.use('/user',require('./Routes/user.routes'))
app.use('/api',require('./Routes/category.routes'))
app.use('/api',require('./Routes/place.routes'))
app.use('/api',require('./Routes/event.routes'))





module.exports = app;










































