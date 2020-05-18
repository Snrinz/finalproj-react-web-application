import express  from 'express';
import moment from'moment';
import mongoose  from 'mongoose';

// const router = express.Router();
var router = express.Router()
// const app = express(); 
import BlogPost  from '../models/blogPost.js';
import Movie  from '../models/movie.js';
import Ratings  from '../models/rating.js';
import Reviews  from '../models/reviews.js';
import User  from '../models/user.js';

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


router.post('/save',async (req, res) => {
    const data = req.body;
    
    const newBlogPost = new BlogPost(data);
    
    await newBlogPost.save((error) => {
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

router.post('/movie',async (req, res) => {
    // const { } = req.body;
    
    const movie = new Movie();

    movie.name = req.body.name;
    movie.type = req.body.type;
    movie.actor = req.body.actor;


    movie.description = req.body.description;
    movie.trailer = req.body.trailer;
    movie.director = req.body.director;
    movie.company = req.body.company;
    movie.photo = req.body.photo;
    movie.onAirTime =  moment(req.body.onAirTime, 'DD/MM/YYYY') ;
    // console.log(req.body);
    // var actor = req.body.actor
    // var type = req.body.type;
    // for (let t of type) {
    //     movie.type.push( t)
    // }

    // // var actor = JSON.stringify(req.body);
    // // actor = JSON.parse(actor); 
    // // console.log(actor);
    
    // for (let actori of actor) {
    //     movie.actor.push( actori)
    // }
   
    await movie.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!',
            movie: movie
        });
    });
});
router.get('/movie/:movieId', async (req , res) =>{
    const {movieId } = req.params;
    Movie.findById(movieId)
    
    .then(async movie =>{
    
        var comments =await  Reviews.find( { _movie : mongoose.Types.ObjectId(movieId)})
        console.log(comments);
        var rating =  await findRating(movieId);
        

         
        return res.json({
            msg:"",
            movie: movie,
            comment: comments,
            rating: rating
        })

    })

})

// router.get('/movie/:movieId', async (req , res) =>{
//     const {movieId } = req.params;
//     Movie.findById(movieId)
    
//     .then(async movie =>{
    
//         var comments =await  Reviews.find( { _movie : mongoose.Types.ObjectId(movieId)})
//         console.log(comments);
//         var rating =  await findRating(movieId);
        

         
//         return res.json({
//             msg:"",
//             movie: movie,
//             comment: comments,
//             rating: rating
//         })

//     })

// })
// app.use('/image', function(req, res){
//     res.sendFile(path.resolve(__dirname, './images/img1.jpg'));
// })
router.get('/movie', async (req , res) =>{
    const {movieId } = req.params;
    Movie.find({})
    
    .then(async movies =>{
        var moviesArr = []
        // console.log(movies);
        
        for (let m of  movies){
            var rating =  await findRating(m._id);
            m = JSON.parse(JSON.stringify(m));
            m.rating = rating;
            moviesArr.push(m)
        }
         
        return res.json({
            movies: moviesArr
        })

    })

})

router.get('/moviemostrating', async (req , res) =>{
    var length =parseInt( req.query.length)
    Movie.find({})
    .skip(0)
    .limit(length)
    .then(async movies =>{
        var moviesArr = []        
        for (let m of  movies){
            var rating =  await findRating(m._id);
            m = JSON.parse(JSON.stringify(m));
            m.rating = rating;
            moviesArr.push(m)
        }
        
        let len=  moviesArr.length
        console.log(len);
        
        console.log(moviesArr[1]);
        
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len-1; j++) {
                    console.log(moviesArr[j].rating +" "+moviesArr[j+1].rating );
                    let tmp1 = moviesArr[j].rating;
                    let one = j+1;
                    console.log(one);
                    
                    let tmp2 = moviesArr[one].rating;
                    if (tmp1 < tmp2) {
                        let tmp = moviesArr[j];
                        moviesArr[j] = moviesArr[j + 1];
                        moviesArr[j + 1] = tmp;
                    }
                }
            }
         
        return res.json({
            msg:"",
            movies: moviesArr
        })

    })

})
router.get('/moviecomingsoon', async (req , res) =>{
    var today = moment().toDate();
    var length =parseInt( req.query.length)
    Movie.find({
        onAirTime:{ $gte: today },
    })
    .skip(0)
    .limit(length)
    .sort( { onAirTime: 1 } )
    .then(async movies =>{
        var moviesArr = []
        console.log(movies);
        
        for (let m of  movies){
            var rating =  await findRating(m._id);
            m = JSON.parse(JSON.stringify(m));
            m.rating = rating;
            moviesArr.push(m)
        }
        
        

         
        return res.json({
            msg:"",
            movies: moviesArr
        })

    })
    
})

router.get('/movieonair', async (req , res) =>{
    var length =parseInt( req.query.length)
    console.log(length);
    
    var today = moment().toDate();
    var lenday = moment(today).subtract(14, 'days').toDate();
    Movie.find({
        $and:[
        {onAirTime:{ $gte: lenday }},
        {onAirTime:{ $lte: today }},
        ]
    })
    .skip(0)
    .limit(length)
    .sort( { onAirTime: 1 } )
    .then(async movies =>{
        var moviesArr = []
        console.log(movies);
        
        for (let m of  movies){
            var rating =  await findRating(m._id);
            m = JSON.parse(JSON.stringify(m));
            m.rating = rating;
            moviesArr.push(m)
        }
        
        

         
        return res.json({
            msg:"",
            movies: moviesArr
        })

    })
    
})
var findRating =async (movieId)=>{
    var ratings = await Ratings.aggregate([
        {
            $match : 
            {_movie: new mongoose.Types.ObjectId(movieId)   ,}
        },
        { 
            $group : 
            {
                _id : 
                { 
                },
                
                count: { $sum: 1 } 
                ,
                countRating: { $sum: "$rating" } 
              
            }
        },
        { $sort : { _id : 1 } }
    ])
    var rating = 0.0;
    if(ratings.length > 0){
        rating = ratings[0].countRating/ ratings[0].count;
    }
    // console.log(ratings);
    return rating;
}


router.post('/rating',async (req, res) => {
    const {  movieId , userId , rating} = req.body;
    
    var ratings = new Ratings({
        _user: new mongoose.Types.ObjectId(userId),
        _movie: new mongoose.Types.ObjectId(movieId),
        rating: rating
    }
    );

   
    await ratings.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!',
            rating: ratings
        });
    });
});

router.post('/reviews',async (req, res) => {
    const {  movieId , userId , comment} = req.body;
    
    var  reviews = new Reviews({
        _user: new mongoose.Types.ObjectId(userId),
        _movie: new mongoose.Types.ObjectId(movieId),
        comment: comment
    }
    );

   
    await reviews.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!',
            reviews: reviews
        });
    });
});


router.post('/users',async (req, res) => {
 

    const _email = req.body.email.toLowerCase();
    User.findOne({email: _email},async function (err, user) {
        // if there are any errors, return the error
        if (err)
            return done(err);

        // check to see if theres already a user with that email
        if (user) {
            return res.status(410).send('อีเมลนี้ถูกใช้แล้ว');
        }else {

            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.email = _email;
            newUser.phoneNo = req.body.phoneNo;
            newUser.firstName= req.body.firstName,
            newUser.lastName = req.body.lastName,
            newUser.password = newUser.generateHash(req.body.password);

            await newUser.save((error) => {
                if (error) {
                   return res.status(500).json({ msg: 'Sorry, internal server errors' });
                    
                }
                // BlogPost
                return res.json({
                    msg: 'Your data has been saved!!!!!!',
                    User: newUser
                });
            });
        }
    })
});
export default router;

// router.get('/name', (req, res) => {
//     const data =  {
//         username: 'peterson',
//         age: 5
//     };
//     res.json(data);
// });


