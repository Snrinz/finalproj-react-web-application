// index.js -- server side
import express from 'express'; 
import bodyParser from 'body-parser';

import mongoose  from 'mongoose';
import morgan  from 'morgan';
import path  from 'path';



// const app = express();
// const PORT = process.env.PORT || 8080; // Step 1
// import routes  from './routes/api';

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
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Step 3

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
// }


// // HTTP request logger
// app.use(morgan('tiny'));
// app.use('/api', routes);



// app.listen(PORT, console.log(`Server is starting at ${PORT}`));



app.use(bodyParser.json());

// make server start listening on a specified port 
app.listen(port, () => 
    console.log(`Server started at port ${port}`)
);

// entry route for root / request
app.get('/', (req, res) => { 
    res.end("Hello World"); 
 })

 app.get('/products/:tagId', function(req, res) {
    res.send("tagId is set to " + req.params.tagId);
  });  

const Products = [ 
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football', sku:'1234'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball', sku:'3444'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball', sku:'1344'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch', sku:'3422'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5', sku:'2567'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7', sku:'3214'},
    {category: 'Kitchenware', price: '$9.99', stocked: true, name: 'Pot', sku:'1414'},
];

// entry route for /product post-request
app.post('/product', (req, res) => {
    if (req.is('json')) {
        let body = req.body;
        Products.push(body);
        res.end(`Received new product!\n${Object.keys(req.body)[0]}: ${Object.values(req.body)[0]}`);
    } 
    else {
        res.status(400).end(`Expected JSON product data!\n${req.body}`);
    }
});

// entry route for /products request 
app.get('/products', (req, res) => { 
    res.json(Products); 
});
