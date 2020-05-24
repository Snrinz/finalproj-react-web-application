import React, { Component , useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
//library for Comment.js
import defaultUser from './img/default_user.png'
import Context from './utils/authUtils/Context';
import moment from'moment';
//library for MovieCard
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import Loading from "./Loading"
import PostForm from './CommentPost'

//library for Rating
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

// API for Animation
import Aos from "aos"
import 'aos/dist/aos.css'
// import history from './utils/authUtils/history' //use if you want to redirect after submit

export default class DetailMovie extends Component {
    state = {
        movie_detail: {},
        rating: 0,
        review_list: [],
        isLoad: true,
        profile:{}
    }
    
    componentDidMount () {
        // const context = useContext(Context);
        // this.setState({profile: context.profileState}) 
        let { movie_id } = this.props.match.params
        console.log("DID MOUNT");
        // Get Movie Detail
        fetch(`/api/movie/${movie_id}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("Movie is " + res.movie)
            this.setState({movie_detail: res.movie, rating:res.rating, isLoad:false})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        }) 

        // Get Review
        fetch(`/api/reviews/movie/${movie_id}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("Review List: " + res.reviews)     
            console.log("Before " + this.state.review_list);
            this.setState({review_list: res.reviews})
        })
        .catch(err => {
            console.log("error2 " + JSON.stringify(err)); 
        }) 

        Aos.init({ duration: 2000})
    }

    render() {

        return (
        <div>
            <div className="grid-section">
        {
        (this.state.isLoad)?
                <Loading />
         :
        <>
                <div style={{marginTop: '20px'}} data-aos="fade-up" className="detail-movie-section" >
                    <img id="image-detail-movie" src={require(`./img/${this.state.movie_detail.photo}`)} alt={this.state.movie_detail.photo}></img>

                <div className="description-section">
                    <div className="descrip">                        
                        <h2>{this.state.movie_detail.name}</h2>
                        <div className="rating-section">
                            <h2><FontAwesomeIcon id="star" icon={faStar} /> {this.state.rating.toFixed(1)} </h2>
                        </div>
                    </div>
                    <hr style={{opacity: '0'}} />
                    <div className="descrip">
                        <p>ให้คะแนน : &nbsp;</p><Rate movieId={this.state.movie_detail._id} vote_average={this.state.rating} />
                    </div>
                    <hr />
                    <div className="descrip">
                        <p>แนวประเภท : </p>
                        {
                        (this.state.movie_detail.type && Object.keys(this.state.movie_detail.type).length > 0)
                            ? this.state.movie_detail.type.map(type => (
                                <p key={type} style={{paddingLeft: "10px"}}>{type}</p>
                            ))
                            : ""
                        }
                    </div>
                    <hr />
                    <div className="descrip">
                    <p>นักแสดงนำ : </p>
                        {
                        (this.state.movie_detail.actor && Object.keys(this.state.movie_detail.actor).length > 0)
                            ? this.state.movie_detail.actor.map(actor => (
                                <p key={actor} style={{paddingLeft: "10px"}}>{actor}</p>
                            ))
                            : ""
                        }
                    </div>
                    <hr />
                    <div className="descrip">
                        <p>ผู้กำกับ : &nbsp;</p>
                        <p style={{alignSelf: 'center'}}>{this.state.movie_detail.director}</p>
                    </div>
                    <hr />
                    
                    <div className="descrip">
                        <p>บริษัทผู้สร้าง : &nbsp;</p>
                        <p style={{alignSelf: 'center'}}>{this.state.movie_detail.company}</p>
                    </div>

                    <hr />   
                    <div>
                         <p>เรื่องย่อ : </p>
                            <div className="descrip">
                                <span> {this.state.movie_detail.description} </span>
                            </div>
                    </div>
                    <hr />   
                    <div className="descrip">
                         <p>วันที่เข้าฉาย : &nbsp;</p>
                         <p style={{alignSelf: 'center'}}> { moment(this.state.movie_detail.onAirTime).locale('th').format('LL') } </p>
                    </div>
                    <hr />  
                     
                </div>  
                 
                    
                 
            </div>

            <div data-aos="fade-up">
                <h2 id="comments-title" >Trailer</h2>
                <div style={{display:'flex', justifyContent: 'center', marginBottom: '50px'}}>
                    <ReactPlayer width={1000} height={500} url={this.state.movie_detail.trailer} controls={true}></ReactPlayer>
                </div>
            </div>
        </>
        }       



            <div data-aos="fade-up">
                <h2 id="comments-title" >Comments</h2>
                {
                    <React.Fragment>
                        {
                        (this.state.review_list && Object.keys(this.state.review_list).length > 0)? 
                            this.state.review_list.map(review => (
                                <Comment key={review._id} review={review} />
                            ))
                            : <p id="no-comment">There are no comments</p>
                            
                        }
                    </React.Fragment>
                }
                
                <PostComment movieId={this.state.movie_detail._id} />                 
            </div>


           </div>
        </div>

        )
    }
}

const Comment = (props) => {
    const { review } = props
    var getFullName = () => {
        return review._user.firstName + " " + review._user.lastName
    }
    return (
        <div>

            <div className="comment-section">
                <div className="comment-about">                        
                    <div className="comment-user">       
                        <img id="img-user-comment" src={defaultUser} alt="sth" />
                        <div className="information-user">
                            <span id="usrname">{getFullName()}</span>
                            <span id="date-post">{ moment(review.createdAt).locale('th').format('LL') }</span>
                        </div>                            
                    </div>
                    <p id="text-comment">{review.comment}</p>
                </div>
            </div>
            
        </div>
    )
}

const Rate = (props) => {
    const { movieId } = props
    const context = useContext(Context);

    const profile = context.profileState
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);

    const useStyles = makeStyles({
        root: {
          width: 200,
          display: 'flex',
          alignItems: 'center',
        },
      });
    const classes = useStyles();

    const labels = {
        0.5: '0.5 Stars',
        1: '1 Stars',
        1.5: '1.5 Stars',
        2: '2 Stars',
        2.5: '2.5 Stars',
        3: '3 Stars',
        3.5: '3.5 Stars',
        4: '4 Stars',
        4.5: '4.5 Stars',
        5: '5 Stars',
        5.5: '5.5 Stars',
        6: '6 Stars',
        6.5: '6.5 Stars',
        7: '7 Stars',
        7.5: '7.5 Stars',
        8: '8 Stars',
        8.5: '8.5 Stars',
        9: '9 Stars',
        9.5: '9.5 Stars',
        10: '10 Stars'    
      };

    useEffect(() => {
        if(value === 0) return

        console.log("Rate value is " + value);
        let data = {
            userId: profile._id,
            movieId: movieId,
            rating: value
        }
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        };
        fetch('/api/rating', requestOptions)
        .then(response => {
            if (response.status !== 200) {
              console.log(response.statusText);
              throw `Status Code: ${response.status} ${response.statusText}`;
            }
            return response.json()
        })
        .catch(err => { 
            console.log(err);
        });
    }, [value]);

    return(
        <>
            { context.authState ? 
                <div className={classes.root}>
                    <Rating
                    name="hover-feedback"
                    max={10}
                    value={value}
                    defaultValue={0}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    />
                    {value !== null && 
                    <Box fontSize={{ xs: 'medium' }}
                    p={{ xs: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>
                : <div style={{alignSelf: 'center'}}> ต้องเข้าสู่ระบบก่อน</div>
            }
        </>
    )
}

const PostComment = (props) => {
    const { movieId } = props
    const context = useContext(Context);
    const profile = context.profileState
    console.log("user",profile);
    return(
        <>
            { (context.authState) ? 
                <PostForm userId={profile._id} movieId={movieId} />
                : <div style={{marginTop: '50px', textAlign: 'center', fontWeight: 'bold'}}>ต้องเข้าสู่ระบบก่อน จึงจะแสดงความคิดเห็นได้</div>
            }
        </>
    )
}

// const PostForm = (props) => {
//     const [comment, setComment] = useState("")

//     const handleSubmit = () => {
//         let data = {
//             userId: props.userId,
//             movieId: props.movieId,
//             comment: comment
//         }

//         fetch('/api/reviews', {
//             method: 'POST',
//             // withCredentials: true,
//             // credentials: 'include',
//             body: JSON.stringify(data),
//             // headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
//             // headers: new Headers({ 'Content-Type': 'application/json',
//             // 'Authorization': localStorage.getItem('token') }),
//           })
//           .then(response => {
//             if (response.status !== 200) {
//               console.log(response.statusText);
//               throw `Status Code: ${response.status} ${response.statusText}`;
//             }
//             return response.json()
//           })
//           .then(response => {
//               history.push('/');
//           })
//           .catch(err => { 
//             console.log(err);
//           });
//     }
      
      
//     return (
//         <div className="post-section">
//             <form onSubmit={handleSubmit}>
//                 <textarea name="text-post" 
//                     type="text" 
//                     placeholder="Type text in here . ."
//                     onChange={(event) => setComment(event.target.value)}
//                     name="comment"
//                     required
//                     />
                
//                 <input type="submit" />
//             </form>   
//         </div>
//     )
// }
