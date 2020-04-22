// index.js -- server side
import express from 'express'; 
import bodyParser from 'body-parser';
// var request   = require('request');
import mongoose  from 'mongoose';
import morgan  from 'morgan';
import path  from 'path';

import  BlogPost  from "./models/blogPost.js";


// const app = express();
// const PORT = process.env.PORT || 8080; // Step 1

import  router   from './routes/api.js';


// const routes = require('./routes/api');
const app = express(); 
const port = process.env.PORT || 8080;


// Step 2
mongoose.connect( 'mongodb+srv://france:france090@cluster0-p0dro.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// // Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // Step 3

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
// }


// // HTTP request logger
app.use(morgan('tiny'));
app.use('/api', router);



// app.listen(PORT, console.log(`Server is starting at ${PORT}`));



app.use(bodyParser.json());

// make server start listening on a specified port 
app.listen(port, () => 
    console.log(`Server started at port ${port}`)
);

// entry route for root / request
// app.get('/', (req, res) => { 
//     res.end("Hello World"); 
//  })

//  app.get('/products/:tagId', function(req, res) {
//     res.send("tagId is set to " + req.params.tagId);
//   });  



// entry route for /product post-request
// app.post('/product', (req, res) => {
//     if (req.is('json')) {
//         let body = req.body;
//         Products.push(body);
//         res.end(`Received new product!\n${Object.keys(req.body)[0]}: ${Object.values(req.body)[0]}`);
//     } 
//     else {
//         res.status(400).end(`Expected JSON product data!\n${req.body}`);
//     }
// });

// // entry route for /products request 
// app.get('/products', (req, res) => { 
//     res.json(Products); 
// });
