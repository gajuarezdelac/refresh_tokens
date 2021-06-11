
const express = require('express')
const config = require('./config')
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
// const path = require('path');


const app = express();

// 
app.use(cors());
app.use(express.json());


// DB Connection
const URI = process.env.MONGODB_URL;
mongoose.connect(URI,{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Conectado a mongo DB')
});

// Routes 
app.use('/auth', require('./routes/AuthRoute'));


// Running Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log('listening on the port ' + PORT);
})

