// Product.js
import React, { useState, useEffect } from 'react'

// const dummyProducts = [
//     {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football', sku:'1234'}, 
//     {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball', sku:'3444'}, 
//     {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball', sku:'1344'}, 
//     {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch', sku:'3422'},  
//     {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5', sku:'2567'},  
//     {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7', sku:'3214'},  
// ];

const Product = () => {
    //const products dummyProducts;
    const [products, setProducts] = useState([]); 
    useEffect(() => { 
        fetch('/products') 
        .then(res => res.json()) 
        .then(res => setProducts(res)); 
    } , [products]); 
    
    const [txtValue, setTxtValue] = useState(""); 
    let handleClick = () => { 
        fetch('/product', { 
            method: 'POST', 
            body: txtValue, 
            headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then(res => res.json()) 
    .catch(error => { console.error('Error:', error); }) 
    .then(response => { 
        console.log('Success:', response); 
        setProducts(response); 
        setTxtValue(""); 
    }) 

    } 
    
    return ( 
        <> 
        <ProductTable products={products}/> 
        <textarea value={txtValue} rows="4" cols="50" onChange={(e)=>setTxtValue(e.target.value)}> {txtValue} </textarea> 
        <button onClick={handleClick}>Submit</button> </> 
        ) 
}

const ProductTable = ({products}) => {
    let tableHead = () => {
        let header = Object.keys(products[0])
        .map((e) => <th>{e}</th>);
        return <tr>{header}</tr>; 
    }

    let tableBody = () => {
        let header = Object.keys(products[0]);
        let body = products.map(e=> {
            let tmp = []
            for (let i of header)
                if (typeof e[i] === "boolean")
                    tmp.push(<td>{e[i].toString()}</td>)
                else
                    tmp.push(<td>{e[i]}</td>)
            return <tr>{tmp}</tr> 
        })

        return body;
    }


    return ( 
        <>
        <h1>Product List</h1>
        { 
            (products && products.length > 0)? 
            <table>
                <thead> 
                    {tableHead()}
                </thead>
                <tbody>
                    {tableBody()}
                </tbody>
            </table>
            : <h2>Loading...</h2>
        }
        </>
    )
}
export default Product;