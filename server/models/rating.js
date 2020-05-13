import mongoose  from 'mongoose';

import User from './user'
import Movie from './movie'

// Schema
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    
    rating:{ type: Number, default: 0 },
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},


    
},
 {
    timestamps: true
});
// methods ======================

const  Review = mongoose.model('Rating', ratingSchema);



export default Review;