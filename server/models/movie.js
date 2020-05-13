import mongoose  from 'mongoose';

// import User from './user'

// Schema
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    name : String,
    type: String,
    description: String,    
    trailer: String,         // www.youtube /url
    actor: [ String ],
    director: String,
    company: String,
    onAirTime: Date
},
 {
    timestamps: true
});
// methods ======================

const  Movie = mongoose.model('Movie', movieSchema);



export default Movie;