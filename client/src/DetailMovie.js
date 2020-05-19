import React, { Component, useState } from 'react'
// import ReactPlayer from 'react-player'
// import imgTrailer from './img/trailer2.jpg'
//library for Comment.js
import defaultUser from './img/default_user.png'

import moment from'moment';
//library for MovieCard
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import Loading from "./Loading"
// import { withFormik } from 'formik'
// import { withRouter } from 'react-router-dom';
// import * as Yup from 'yup';
import PostForm from './CommentPost'

export default class DetailMovie extends Component {
    state = {
        movie_detail: {},
        credits_list: {},
        review_list: {},
        isLoad: true
    }

    componentDidMount () {
        let { movie_id } = this.props.match.params
        console.log("DID MOUNT");
        // Get Movie Detail
        fetch(`/api/movie/${movie_id}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log(res.movie)
            this.setState({movie_detail: res.movie, isLoad:false})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        }) 

        // Get Review
        fetch(`/api/movie/${movie_id}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log(res.movie)
            this.setState({movie_detail: res.movie, isLoad:false})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        }) 
    }

    render() {

        return (
        <div>

            <div className="grid-section">
        {
        (this.state.isLoad)?
            <Loading />
        :
                <div className="detail-movie-section">
                    <img id="image-detail-movie" src={require(`./img/${this.state.movie_detail.photo}`)} alt={this.state.movie_detail.photo}></img>

                <div className="description-section">
                    <Rate vote_average={this.state.movie_detail.rating} />
                    <div className="descrip">                        
                        <h2>{this.state.movie_detail.name}</h2>
                    </div>

                    <hr style={{opacity: '0'}} />
                    <div className="descrip">
                        <p>แนวประเภท: </p>
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
                        <p>นักแสดงนำ: </p>
                        {
                        (this.state.movie_detail.actor && Object.keys(this.state.movie_detail.actor).length > 0)
                            ? this.state.movie_detail.actor.map(type => (
                                <p key={type} style={{paddingLeft: "10px"}}>{type}</p>
                            ))
                            : ""
                        }

                    </div>
                    <hr />
                    <div className="descrip">
                        <p>ผู้กำกับ: </p>
                        <p style={{alignSelf: 'center'}}>{this.state.movie_detail.director}</p>
                    </div>
                    <hr />
                    
                    <div className="descrip">
                        <p>บริษัทผู้สร้าง:{this.state.movie_detail.company} </p>
                        {/* <p style={{alignSelf: 'center'}}>Chris Buck, Jennifer Lee, Marc Smith, Robert Lopez, Kristen Anderson-Lopez</p> */}
                    </div>

                    <hr />   
                    <div>
                         <p>เรื่องย่อ: </p>
                            <div className="descrip">
                                <span> {this.state.movie_detail.description} </span>
                            </div>
                    </div>
                    <hr />   
                    <div>
                         <p>วันที่เข้าฉาย: </p>
                            
                                <span> {moment(this.state.movie_detail.onAirTime).locale('th').format('LL') } </span>
                            
                    </div>
                    <hr />  
                     
                </div>  
                 
                    
                 
            </div>
        }

            {/* <div className="trailer-section">
                <img id="trailer-image" src={imgTrailer}  alt="sth"></img>
                <ReactPlayer url="https://www.youtube.com/watch?v=3cxixDgHUYw" controls={true}></ReactPlayer>
            </div>
            <div style={{display: 'flex', align: 'center'}}>
            <img id="trailer-image" src={imgTrailer}  alt="sth"></img>
                {
                    (this.state.movie_detail.trailer)? <ReactPlayer url={this.state.movie_detail.trailer}  controls={true}></ReactPlayer> : ""

                }
            </div>  */}

            <h2 id="comments-title" >Comments</h2>
            
            {
                <React.Fragment>
                    {
                        (this.state.review_list && Object.keys(this.state.review_list).length > 0)
                        ? this.state.review_list.map(review => (
                        <Comment key={review.id} review={review} />
                        ))
                        : <p id="no-comment">There are no comments</p>
                        
                    }
                </React.Fragment>
            }

            <PostForm userId="Pailin" movieId={this.state.movie_detail._id} />

            </div>
            
        </div>

        )
    }
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

            <div class="comment-section">
                <div class="comment-about">                        
                    <div class="comment-user">       
                        <img id="img-user-comment" src={defaultUser} alt="sth" />
                        <div class="information-user">
                            <span id="usrname">{review.author}</span>
                            <span id="date-post">19 Feb 2020</span>
                            <span id="time">1 hour ago</span>  
                        </div>                            
                    </div>
                    <p id="text-comment">{review.content}</p>
                </div>
            </div>
            
        </div>
    )
}