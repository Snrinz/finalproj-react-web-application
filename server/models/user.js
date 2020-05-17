import mongoose from 'mongoose';
import {validatorEmail} from '../util/util.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from "../config/jwtConfig.js";

// Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNo: [String],
    email: { type: String, lowercase: true, trim: true },
    password: String,
    memberType: {type: String, enum: ['MEMBER', 'ADMIN'], default: 'MEMBER'},
    
},
 {
    timestamps: true
});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
    const expiresIn = 7200;
    return {token: jsonwebtoken.sign({email: this.email, _id: this._id, memberType: this.memberType},
            jwtSecret, { expiresIn}), // 2 hour
            expiresIn: expiresIn
    }
}

userSchema.methods.toAuthJSON = function () {
  let genJWT =this.generateJWT();
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phoneNo: this.phoneNo,
    memberType: this.memberType,
    token: "bearer " +genJWT.token,
    expiresIn: genJWT.expiresIn,
  };
};

userSchema.methods.toNewRegisterJSON = function () {
    return {
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNo: this.phoneNo,
        memberType: this.memberType,
    };
};
  
userSchema.methods.toProfileJSON = function () {
    return {
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNo: this.phoneNo,
        memberType: this.memberType,
        hasAvatar: this.avatar !== null,
        signUpDate: this.signUpDate,
        like : this.like
    };
};

// Model
const  UserModel = mongoose.model('User', userSchema);


export default UserModel;