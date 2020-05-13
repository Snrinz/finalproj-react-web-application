import express  from 'express';

// const router = express.Router();
var router = express.Router()
// const app = express(); 
import BlogPost  from '../models/blogPost.js';
import Movie  from '../models/movie.js';



// Routes
router.get('/', (req, res) => {

    BlogPost.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

// module.exports = router;


router.post('/save', (req, res) => {
    const data = req.body;
    
    const newBlogPost = new BlogPost(data);
    
    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

router.post('/savemovie', (req, res) => {
    const { } = req.body;
    
    const newBlogPost = new BlogPost(data);
    
    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});


export default router;

// router.get('/name', (req, res) => {
//     const data =  {
//         username: 'peterson',
//         age: 5
//     };
//     res.json(data);
// });


