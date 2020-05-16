// index.js -- server side
import express from 'express'; 
import bodyParser from 'body-parser';
// import mongoose  from 'mongoose';
import morgan  from 'morgan';
import { logError } from './util/util.js';
import logger from 'morgan';
import mongooseDbConnect from './config/database.js';
import userRouter from './routes/userRouter.js';

const app = express(); 
const port = 4001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // Middleware
    extended: true
}));
app.use(logger("short"))

// connect to mongoDB
app.use(mongooseDbConnect())

app.use('/api/user', userRouter);

// make server start listening on a specified port 
app.get('/', (req, res) => res.status(404).json(logError("Not Found")) ) 
app.use('/*', (req, res) => res.status(422).json(logError("Unsupported path entity")) );
app.listen(port, () => 
    console.log(`Server started at port ${port}`)
);

// mongoose.connect( 'mongodb+srv://france:france090@cluster0-p0dro.mongodb.net/test?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose is connected!!!!');
// });

// // HTTP request logger
// app.use(morgan('tiny'));
