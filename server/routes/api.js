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

router.post("/upload", async (req, res) => {

    const storage = multer.diskStorage({
        destination: "./public/uploads/",
        filename: function(req, file, cb){
           cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
        }
     });
     
    const upload = multer({
        storage: storage,
        limits:{fileSize: 1000000},
     }).single("myImage");

    upload(req, res, (err) => {
       console.log("Request ---", req.body);
       console.log("Request file ---", req.file);//Here you get file.
       /*Now do where ever you want to do*/
       if(!err)
          return res.send(200).end();
    });
 });

router.post('/newmovie',async (req, res) => {
    let { name, type, description, trailer, director, actor, company, photo, onAirTime } = req.body
    console.log("new movie request: " + name);
    
    let str = type.replace(/\s/g,'')
    let typelist = []
    typelist = str.split(',')

    str = actor.replace(/\s/g,'');
    let actorlist = str.split(',')
    
    var movie = new Movie({
        name,
        // typelist,
        description,    
        trailer,         // www.youtube /url
        director,
        // actorlist,
        company,
        photo,
        onAirTime
    });

    movie.type = typelist
    movie.actor = actorlist
    
    Movie.init()
    .then(function() { // avoid dup by wait until finish building index
        movie.save()
        .then(movie => {
            return res.json({success: true, message: 'Movie Created', 
                      movie: movie.toNewRegisterJSON()});
        }).catch(err => {
            return res.status;
        });
    });

});

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

router.post('/movie', async (req, res) => {
    // const { } = req.body;

    movie.name = req.body.name;
    movie.type = req.body.type;
    movie.actor = req.body.actor;
    movie.description = req.body.description;
    movie.trailer = req.body.trailer;
    movie.director = req.body.director;
    movie.company = req.body.company;
    movie.photo = req.body.photo;
    movie.onAirTime =  moment(req.body.onAirTime, 'DD/MM/YYYY') ;
    // Movie.init()
    await movie.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.status(200).json({
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
        // console.log(comments);
        var rating =  await findRating(movieId);
         
        return res.json({
            msg:"",
            movie: movie,
            comment: comments,
            rating: rating
        })

    })
})

router.get('/users', async (req , res) =>{
    let filterInstruction = {}

    User.find(filterInstruction)
    .then(async users =>{
        var usersArr = []

        // for (let user of  users){
        //     var rating =  await findRating(user._id);
        //     user = JSON.parse(JSON.stringify(user));
        //     user.rating = rating;
        //     moviesArr.push(m)
        // }

        return res.json({
            users: usersArr
        })
    })
    
})

router.get('/movie', async (req , res) =>{
    let filterInstruction = {}
    
    Movie.find(filterInstruction)
    .then(async movies =>{
        var moviesArr = []

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
// Update a movie identified by the movieId in the request
router.post('/movie/:movieID', async (req , res) =>{
    console.log("PUTTTTTTTTTTTTTTTTTTTTTTTTTT");
    
    if (!req.body) 
        return res.status(422).json(logError('Need updated data'));

    let { name, type, description, trailer, director, company, photo, movieId, onAirTime } = req.body

    Movie.findByIdAndUpdate(req.params.movieID,
        {
            $set: {name, type, description, trailer, director, company, photo, onAirTime}
        }
    ).then(movie => {
        if(!movie) {
            res.status(404).json(logError("Movie not found with id " + req.params.movieID));
        }
        movie.save().then(result => res.json({movie: result.toProfileJSON()}))
        .catch(err => res.status(422).json(logError(err)))
    })
})

router.get('/moviemostratingall', async (req , res) => {

    let filterInstruction = {}
    let filter = req.query.filter

    if(filter == 'movie')
        filterInstruction = {
            $or: [{name: new RegExp('^' + req.query.value, 'i')}, 
            {description:new RegExp('^' + req.query.value, 'i')}]
        }
    else if(filter == 'type')
        filterInstruction = {
            type: req.query.value
        }
    else if(filter == 'actor')
        filterInstruction = {
            actor: new RegExp('^' + req.query.value, 'i')
    }

    Movie.find(filterInstruction)
    .then(async movies =>{
        var moviesArr = []

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
    var length =parseInt( req.query.limit)
    var page = req.query.page
    var startIndex = (page-1) * length    

    // let filterInstruction = {}
    // let filter = req.query.filter

    // if(filter == 'movie')
    //     filterInstruction = {
    //         $or: [{name: new RegExp('^' + req.query.value, 'i')}, 
    //         {description:new RegExp('^' + req.query.value, 'i')}]
    //     }
    // else if(filter == 'type')
    //     filterInstruction = {
    //         type: req.query.value
    //     }
    // else if(filter == 'actor')
    //     filterInstruction = {
    //         actor: new RegExp('^' + req.query.value, 'i')
    // }

    Movie.find({})
    .then(async movies =>{
        var moviesArr = []        
        for (let m of  movies){
            var rating =  await findRating(m._id);
            m = JSON.parse(JSON.stringify(m));
            m.rating = rating;
            moviesArr.push(m)
        }
        
        let len=  moviesArr.length
        // console.log(len);
        
        // console.log(moviesArr[1]);
        
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len-1; j++) {
                    // console.log(moviesArr[j].rating +" "+moviesArr[j+1].rating );
                    let tmp1 = moviesArr[j].rating;
                    let one = j+1;
                    // console.log(one);
                    
                    let tmp2 = moviesArr[one].rating;
                    if (tmp1 < tmp2) {
                        let tmp = moviesArr[j];
                        moviesArr[j] = moviesArr[j + 1];
                        moviesArr[j + 1] = tmp;
                    }
                }
            }
        var arr = [];
        if(startIndex >= len ){
            startIndex = 0;
        }
        let j = startIndex;
        for (let i = 0 ;i< 4 ;i++){
            
            if(j>=moviesArr.length ){
                break;
            }
            arr.push(moviesArr[j])
            j++;
        }    
        // let i = startIndex;
        // while()
        return res.json({
            msg:"",
            movies: arr
        })

    })
})

router.get('/moviecomingsoon', async (req , res) =>{
    var today = moment().toDate();
    var page = req.query.page
    var limit = parseInt(req.query.limit)
    

    var startIndex = (page-1) * limit
    // var endIndex = page * limit
    console.log("page: " + page + "limit: " + limit);

    let filterInstruction = {onAirTime:{ $gte: today }}
    let filter = req.query.filter

    if(filter == 'movie')
        filterInstruction = {
            $and: [
                {onAirTime:{ $gte: today }},
                {$or: [{name: new RegExp('^' + req.query.value, 'i')}, 
                    {description:new RegExp('^' + req.query.value, 'i')}]}
            ]
        }
    else if(filter == 'type')
        filterInstruction = {
            $and: [{onAirTime:{ $gte: today }},
            {type: req.query.value}
            ]
            
        }
    else if(filter == 'actor')
        filterInstruction = {
            $and: [{onAirTime:{ $gte: today }},
            {actor: new RegExp('^' + req.query.value, 'i')}]
        }

    Movie.find(filterInstruction)
    // Movie.find({
    //     onAirTime:{ $gte: today },
    // })
    .skip(startIndex)
    .limit(limit)
    .sort( { onAirTime: 1 } )
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
            msg:"",
            movies: moviesArr
        })

    })
    
})

router.get('/movieonair', async (req , res) =>{
    var length =parseInt(req.query.limit)
    var page = req.query.page
    var startIndex = (page-1) * length
    
    var today = moment().toDate();
    var lenday = moment(today).subtract(14, 'days').toDate();

    let filterInstruction = {$and:[
        {onAirTime:{ $gte: lenday }},
        {onAirTime:{ $lte: today }},
        ]}
    let filter = req.query.filter

    if(filter == 'movie')
        filterInstruction = {
            $and:[
                {onAirTime:{ $gte: lenday }},
                {onAirTime:{ $lte: today }},
                {$or: [{name: new RegExp('^' + req.query.value, 'i')}, 
                {description:new RegExp('^' + req.query.value, 'i')}]}
                ]
        }
    else if(filter == 'type')
        filterInstruction = {
            $and:[
                {onAirTime:{ $gte: lenday }},
                {onAirTime:{ $lte: today }},
                {type: req.query.value}
                ]
        }
    else if(filter == 'actor')
        filterInstruction = {
            $and:[
                {onAirTime:{ $gte: lenday }},
                {onAirTime:{ $lte: today }},
                {actor: new RegExp('^' + req.query.value, 'i')}
                ]
    }

    Movie.find(filterInstruction)
    .skip(startIndex)
    .limit(length)
    .sort( { onAirTime: 1 } )
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
            msg:"",
            movies: moviesArr
        })

    })
})
router.get('/reviews/movie/:movieId', async (req , res) =>{
    const {movieId } = req.params;
    console.log(movieId);
    
    
    Reviews.find({
        _movie: new mongoose.Types.ObjectId(movieId)
    })
    // .populate("_user")
    .sort( { createdAt: -1 } )
    
    .then(async reviews =>{
       console.log(reviews);
    var arr = [];
    for(let i of reviews){
        console.log(i._user);
        
        var user =await  User.findById(i._user)
        i = JSON.parse(JSON.stringify(i));
        i._user = user
        arr.push(i)
    }
    //   
         
        return res.json({
            msg:"",
            reviews: arr
        })

    })
})

router.get('/rating/movie/:movieId', async (req , res) =>{
    const {movieId } = req.params;
    console.log(movieId);
    
    var ratings =await findRating(movieId)

    return res.json({
        msg: '',
        rating: ratings
    });
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
    var raingfind=await Ratings.findOne(
        {
            _user: new mongoose.Types.ObjectId(userId),
            _movie: new mongoose.Types.ObjectId(movieId),
        }
    )
    if(raingfind){        
        raingfind.rating = rating;
        await raingfind.save((error) => {
            if (error) {
                res.status(500).json({ msg: 'Sorry, internal server errors' });
                return;
            }
         
            return res.json({
                msg: 'Your data has been saved!!!!!!',
                rating: raingfind
            });
        });
    }else{
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
    }



    
});

router.post('/reviews',async (req, res) => {
    const   movieId  = req.body.movieId;
    const comment = req.body.comment;
    console.log(req.body);
    
    const userId = req.body.userId;
    console.log("Request ขอคอมเม้นหน่อยจ้า " + movieId + " " + userId + " " + comment);
    
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