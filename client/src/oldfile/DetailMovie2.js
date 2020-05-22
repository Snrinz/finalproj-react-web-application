import React, { Component, useState, useEffect } from 'react'
// import ReactPlayer from 'react-player'
// import imgTrailer from './img/trailer2.jpg'
//library for Comment.js
import defaultUser from './img/default_user.png'

import moment from'moment';
//library for MovieCard
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import Loading from "../Loading"
// import { withFormik } from 'formik'
// import { withRouter } from 'react-router-dom';
// import * as Yup from 'yup';
import PostForm from '../CommentPost'

export default function DetailMovie () {
    const [movie_detail, setMovie_detail] = useState({})
    const [credits_list, setCredits_list] = useState({})
    const [review_list, setReview_list] = useState({})
    const [isLoad, setisLoad] = useState(true)

    useEffect(() => {
        let { movie_id } = this.props.match.params
        //Get Movie Detail
        fetch(`/api/movie/${movie_id}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("Movie" + res.movie)
            setMovie_detail({movie_detail:res.movie})
            setisLoad({isLoad:false})
        })
        .catch(err => {
            console.log("error1" + JSON.stringify(err)); 
        }) 

       // Get Review
        fetch(`/api/reviews/movie/${movie_id}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("Review List: " + res.reviews[0].comment)
            setReview_list({review_list:res.review, isLoad:false})
        })
        .catch(err => {
            console.log("error2 " + JSON.stringify(err)); 
        }) 
    }, []);
        
        return (
        <div>

            {
            (this.state.isLoad)? "Yes, กำลังโหลด": "No, ไม่โหลดแล้ว"
            }

            <div className="grid-section">
        {
        (this.state.isLoad)?
            <p>ทำไมมาหลายอัน</p>
                //<Loading />
        :
            <>
                <div className="detail-movie-section">
                    <img id="image-detail-movie" src={require(`./img/${movie_detail.photo}`)} alt={movie_detail.photo}></img>
                    {/* <img id="image-detail-movie" src={`./img/${movie_detail.photo}`} alt={movie_detail.photo}></img> */}

                <div className="description-section">
                    <Rate key="" vote_average={movie_detail.rating} />
                    <div className="descrip">                        
                        <h2>{movie_detail.name}</h2>
                    </div>

                    <hr style={{opacity: '0'}} />
                    <div className="descrip">
                        <p>แนวประเภท: </p>
                        {
                        (movie_detail.type && Object.keys(movie_detail.type).length > 0)
                            ? movie_detail.type.map(type => (
                                <p key={type} style={{paddingLeft: "10px"}}>{type}</p>
                            ))
                            : ""
                        }

                    </div>
                    <hr />
                    <div className="descrip">
                        <p>นักแสดงนำ: </p>
                        {
                        (movie_detail.actor && Object.keys(movie_detail.actor).length > 0)
                            ? movie_detail.actor.map(actor => (
                                <p key={actor} style={{paddingLeft: "10px"}}>{actor}</p>
                            ))
                            : ""
                        }

                    </div>
                    <hr />
                    <div className="descrip">
                        <p>ผู้กำกับ: </p>
                        <p style={{alignSelf: 'center'}}>{movie_detail.director}</p>
                    </div>
                    <hr />
                    
                    <div className="descrip">
                        <p>บริษัทผู้สร้าง:{movie_detail.company} </p>
                        {/* <p style={{alignSelf: 'center'}}>Chris Buck, Jennifer Lee, Marc Smith, Robert Lopez, Kristen Anderson-Lopez</p> */}
                    </div>

                    <hr />   
                    <div>
                         <p>เรื่องย่อ: </p>
                            <div className="descrip">
                                <span> {movie_detail.description} </span>
                            </div>
                    </div>
                    <hr />   
                    <div>
                         <p>วันที่เข้าฉาย: </p>
                                <span> {moment(movie_detail.onAirTime).locale('th').format('LL') } </span>
                            
                    </div>
                    <hr />  
                     
                </div>  
                </div>

                <h2 id="comments-title" >Comments</h2>
                {
                    <React.Fragment>
                        {
                            (review_list.review_list && Object.keys(review_list.review_list).length > 0)
                            ? review_list.review_list.map(review => (
                                <Comment key={review.id} review={review} />
                            ))
                            : <p id="no-comment">There are no comments</p>
                            
                        }
                    </React.Fragment>
                }

                <PostForm key="" userId="Pailin" movieId={movie_detail._id} />
            </>
        }
        {/* <h2 id="comments-title" >Comments</h2>
        {
            <React.Fragment>
                {
                    (review_list && Object.keys(review_list).length > 0)
                    ? review_list.map(review => (                
                        <Comment key={review.id} review={review} />
                    ))
                    : <p id="no-comment">There are no comments</p>
                }
            </React.Fragment>
        }
        <PostForm userId="Pailin" movieId={movie_detail._id} /> */}
            </div>
            
        </div>
        )
}

const Rate = (props) => {
    let { vote_average } = props
    const listStar = []

    const [count, setCount] = useState(0)    

    for(var i=1 ; i<=10 ; i++){
        listStar.push(<FontAwesomeIcon onhover={() => setCount(i) } id="starHover" icon={faStar} />)
    }

    return(
        <>
            <div className="ratethis">
                <button id="btnRate">Rate this<FontAwesomeIcon style={{margin: "auto 5px"}} id="star" icon={faStar} /> {vote_average}</button>
                <div className="listStar">{listStar}</div>
            </div>

        </>
    )
}

const Comment = (props) => {
    const { review } = props
    return (
        <div>

            <div className="comment-section">
                <div className="comment-about">                        
                    <div className="comment-user">       
                        <img id="img-user-comment" src={defaultUser} alt="sth" />
                        <div className="information-user">
                            <span id="usrname">{review._id}</span>
                            <span id="date-post">{review.createdAt}</span>
                            {/* <span id="time">1 hour ago</span>   */}
                        </div>                            
                    </div>
                    <p id="text-comment">{review.comment}</p>
                </div>
            </div>
            
        </div>
    )
}