import React from 'react';
import {BrowserRouter, Route, Link, Switch} 
from 'react-router-dom'
import Product from './Product';

function App() {
    return (
        <BrowserRouter>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products'>Product</Link></li>
            </ul>  
        </nav>  
        <Switch>  
            <Route path='/' exact component={()=><h1>My Sweet Home</h1>} />  
            <Route path='/products' component={Product} />  
        </Switch>  
        </BrowserRouter>  
    );  
} 

export default App;