import React, { Component } from 'react'
import axios from 'axios';
import ReactPlayer from 'react-player'

//library for Comment.js
import defaultUser from './img/default_user.png'


export default class DetailMovie extends Component {
    state = {
        movie_detail: {},
        credits_list: {},
        review_list: {}
    }

    componentDidMount () {
        let { movie_id } = this.props.match.params
        console.log("DID MOUNT");
        console.log("ID " + movie_id);

        //  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US&page=1`)
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?language=th&api_key=72c7a3ed944673d07bbf1b9b44dc7894`)
        .then(res => {
            console.log(res.data)
            this.setState({movie_detail: res.data})
        })
        .catch(err => console.log(err)) 

        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=72c7a3ed944673d07bbf1b9b44dc7894`)
        .then(res => {
            console.log(res.data)
            this.setState({credits_list : res.data})
        })
        .catch(err => console.log(err)) 

        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=72c7a3ed944673d07bbf1b9b44dc7894`)
        .then(res => {
            console.log("review: " + res.data)
            this.setState({review_list : res.data.results})
        })
        .catch(err => console.log(err)) 
    }

    render() {

        return (
        <div>

            <div className="grid-section">
            

            <div className="detail-movie-section">
                {/* <div className="image-detail-wrapped"> */}
                <img id="image-detail-movie" src={`https://image.tmdb.org/t/p/original${this.state.movie_detail.poster_path}`} 
                alt={this.state.movie_detail.poster_path}></img>
                {/* </div> */}
                <div className="description-section">

                    <div className="descrip">
                        <h2>{this.state.movie_detail.title}</h2>
                    </div>

                    <hr style={{opacity: '0'}} />
                    <div className="descrip">
                        <p>แนวประเภท: </p>
                        {
                        (this.state.movie_detail.genres && Object.keys(this.state.movie_detail.genres).length > 0)
                            ? this.state.movie_detail.genres.map(type => (
                                <p key={type.id} style={{paddingLeft: "10px"}}>{type.name}</p>
                            ))
                            // if (type.next() == null)
                            : ""
                        }

                    </div>
                    <hr />
                    
                    <div className="descrip">
                        <p>ผู้กำกับ: </p>
                        <p style={{alignSelf: 'center'}}>Chris Buck, Jennifer Lee</p>
                    </div>
                    <hr />
                    
                    <div className="descrip">
                        <p>บทภาพยนตร์: </p>
                        <p style={{alignSelf: 'center'}}>Chris Buck, Jennifer Lee, Marc Smith, Robert Lopez, Kristen Anderson-Lopez</p>
                    </div>

                    <hr />   
                    {
                        (this.state.movie_detail.overview)?
                        <>
                            <p>เรื่องย่อ: </p>
                            <div className="descrip">
                                <span> {this.state.movie_detail.overview} </span>
                            </div>
                        </>
                        : 
                        (this.state.movie_detail.video)? <ReactPlayer url="http://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=72c7a3ed944673d07bbf1b9b44dc7894" controls={true}></ReactPlayer>
                        :""

                    }
                    
                </div>    
                 
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