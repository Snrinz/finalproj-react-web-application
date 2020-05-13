import mongoose  from 'mongoose';
import bcrypt from'bcrypt-nodejs';

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
// Model
const  User = mongoose.model('User', userSchema);


export default User;