import mongoose  from 'mongoose';

import User from './user.js'
import Movie from './movie.js'

// Schema
const Schema = mongoose.Schema;
const reviewsSchema = new Schema({
    comment: String,
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    
},
 {
    timestamps: true
});
// methods ======================

const  Comment = mongoose.model('Review', reviewsSchema);



export default Comment;