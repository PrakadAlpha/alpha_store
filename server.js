const express = require('express');
require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDb = require('./config/db');
const users = require('./routes/auth');
const vendors = require('./routes/vendors');
const products = require('./routes/products');
// const orders = require('./routes/orders');

//Initialize express app 
const app = express();

//Configuring the Environment Variables
dotenv.config({path:'./config/config.env'});

//Development mode logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

//Db connection
connectDb();

//Json parsing
app.use(express.json());

//Form parsing
app.use(express.urlencoded({extended: false}));

//CORS 
app.use(cors());

//Folder for uploading files or images from the client
app.use('/uploads', express.static('uploads'));

//Serving assets
// app.use(express.static(path.join(__dirname, 'static')));

//Routing
app.use('/api/users', users);
app.use('/api/vendors', vendors);
app.use('/api/products', products);
// app.use('/api/orders', orders);


if(process.env.NODE_ENV === 'production'){
  
  app.use(express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

//Redirect all other urls to client(frontend)

//Configure the port
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`.yellow.bold));

//Handle the promise rejection error
process.on('unhandledRejection', (err, promise) => {
  console.log('Error: '.red.bold, err.message);
  server.close(() => process.exit(1));
})