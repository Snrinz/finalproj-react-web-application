import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//library for MovieCard
import { NavLink } from 'react-router-dom'
import imgMovie from './img/Frozen-2.jpg'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faStar } from "@fortawesome/free-solid-svg-icons"


export default class Trending extends Component {
    state = {
        trend_list: []
    }

    componentDidMount () {
        //  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US&page=1`)
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=72c7a3ed944673d07bbf1b9b44dc7894&language=en-US&page=1`)
        .then(res => {
            // console.log(res.data.results)
            this.setState({trend_list: res.data.results})
        })
        .catch(err => console.log(err))
        
    }
    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>

                <FontAwesomeIcon id="left-right" icon={faAngleLeft} />
                <div className="trend-movie-section">
                    {
                        <React.Fragment>
                            {
                                this.state.trend_list.map(movie => (
                                    <MovieCard movie={movie} />
                                ))
                            }
                        </React.Fragment>
                    }
                </div> 
                <FontAwesomeIcon id="left-right" icon={faAngleRight} />
                        
            </div>

        )
    }

}

const MovieCard = (props) => {
    const { movie } = props
    return (            
        <div className="movie-card">
            <NavLink to="/detail-movie/frozen2" className="img-wrapper">
                <img id="movie-image" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                alt={movie.poster_path}></img>
            </NavLink>
            
            {/* <FontAwesomeIcon id="star" icon={faStar} /> 
            <p style={{display: 'inline'}} id="rank">10.0</p> */}

            <NavLink to={`/detail-movie/${movie.id}`} className="name-movie">
                <strong>{movie.title}</strong>
            </NavLink>

            <WatchListButton />        
        </div>
    )
}

const WatchListButton = () => {
    return (
        <div>
            <button className="watch-button">+ Watch</button>
        </div>
    )
}