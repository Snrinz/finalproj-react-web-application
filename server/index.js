// index.js -- server side
import express from 'express'; 
import bodyParser from 'body-parser';
const app = express(); 
const port = 4000;

app.use(bodyParser.json());

// make server start listening on a specified port 
app.listen(port, () => 
    console.log(`Server started at port ${port}`)
);

// entry route for root / request
app.get('/', (req, res) => { 
    res.end("Hello World"); 
 })

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
    console.log(req.body);
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
