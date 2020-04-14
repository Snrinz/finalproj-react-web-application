// import express from 'express'

// let app = express();
// app.get('/', (req, res) => {
//     res.end("Hello World")
// });

// app.listen(4000, () =>
//     console.log("Server start at port 4000")  
// );


// index.js -- server side
import expres from 'express'
const app = express();
const port = 4000;

// entry route for oot / request
app.get('/', (req, res) => {
    res.end("Hello World");
})

// make server start listening on a specificed port
app.listen(port, () => 
    console.log(`Server started at port ${port}`)
)
