import React, { Component, useState } from 'react'
// import axios from 'axios';
import ReactPlayer from 'react-player'
import imgTrailer from './img/trailer2.jpg'
//library for Comment.js
import defaultUser from './img/default_user.png'

import moment from'moment';
// import './App.css';
//library for MovieCard
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"


export default class DetailMovie extends Component {
    state = {
        movie_detail: {},
        credits_list: {},
        review_list: {}
    }

    componentDidMount () {
        let { movie_id } = this.props.match.params
        console.log("DID MOUNT");
        

        //  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US&page=1`)
        // axios.get(`/api/movie/${movie_id}`)
        // .then(res => {
        //     console.log(res.movie)
        //     this.setState({movie_detail: res.movie})
        // })
        // .catch(err => console.log(err)) 
        fetch(`/api/movie/${movie_id}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log(res.movie)
            this.setState({movie_detail: res.movie})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        }) 
        // axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=72c7a3ed944673d07bbf1b9b44dc7894`)
        // .then(res => {
        //     console.log(res.data)
        //     this.setState({credits_list : res.data})
        // })
        // .catch(err => console.log(err)) 

        // axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=72c7a3ed944673d07bbf1b9b44dc7894`)
        // .then(res => {
        //     console.log("review: " + res.data)
        //     this.setState({review_list : res.data.results})
        // })
        // .catch(err => console.log(err)) 
    }

    render() {

        return (
        <div>

            <div className="grid-section">
            

            <div className="detail-movie-section">
                {/* <div className="image-detail-wrapped">
                     <img id="movie-image" src={`./img/${this.state.movie_detail.photo}`} 
                    alt={this.state.movie_detail.photo}></img>  */}
                {/* </div> */}
                   <Img photo={this.state.movie_detail.photo}/> 
                <div className="description-section">
                    {/* <h1>{this.state.movie_detail.name}</h1> */}

                    <Rate vote_average={this.state.movie_detail.rating} />
                    <div className="descrip">                        
                        <h2>{this.state.movie_detail.name}</h2>
                        <h2>{this.state.movie_detail.photo}</h2>


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
            <div className="trailer-section">
                <img id="trailer-image" src={imgTrailer}  alt="sth"></img>
                <ReactPlayer url="https://www.youtube.com/watch?v=3cxixDgHUYw" controls={true}></ReactPlayer>
            </div>
            <div style={{display: 'flex', align: 'center'}}>
            <img id="trailer-image" src={imgTrailer}  alt="sth"></img>
                {
                    (this.state.movie_detail.trailer)? <ReactPlayer url={this.state.movie_detail.trailer}  controls={true}></ReactPlayer> : ""

                }
            </div> 
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

            <Post />


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
            {/* {
                ()
            } */}
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

const Post = () => {
    return (
        <div className="post-section">
            <textarea name="text-post" placeholder="Type text in here . ." /> 
            
            <input type="submit" value="SUBMIT" />

        </div>
    )
}

const Img = (props) => {
    let { photo } = props
    return (
        <React.Fragment>
            <div className="image-detail-wrapped">
                <img id="movie-image" src={`./img/${photo}`} 
                alt={photo}></img> 
            
            </div>
        </React.Fragment>
    )

}
