import mongoose  from 'mongoose';
// import mongoose  from 'mongoose';


// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: new Date()
    }
});

// Model
const  BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// module.exports  =  BlogPost;

export default BlogPost;