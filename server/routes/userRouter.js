// file: route/userRouter.js
import express from 'express';
import {jwtPassport, isInRole } from '../util/jwt-passport.js';
import { ROLES } from '../config/jwtconfig.js';
import { create, checkLogon, validateToken, list, get, 
         put, putImg, getImg}
     from '../controllers/userController.js';

let userRouter = express.Router();
let auth = jwtPassport();

userRouter.use(auth.initialize());

// user router REST API
userRouter.post('/register', create);
userRouter.post('/signin', checkLogon);
userRouter.post('/validateToken', validateToken); 
//userRouter.get('/user/:userId', auth.authenticate(), isInRole(ROLES.owner), get);
userRouter.get('/user/:userId', get);
userRouter.put('/avatar/:userId', auth.authenticate(), putImg);
userRouter.get('/avatar/:userId', auth.authenticate(), getImg);
userRouter.put('/:userId', auth.authenticate(), isInRole(ROLES.owner), put);
userRouter.get('/', auth.authenticate(), isInRole(ROLES.admin), list);
export default userRouter;
