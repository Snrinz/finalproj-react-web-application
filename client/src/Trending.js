import React, { Component } from 'react'
// import MovieCard from './MovieCard'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


//library for MovieCard
import { NavLink } from 'react-router-dom'
import imgMovie from './img/Frozen-2.jpg'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faStar } from "@fortawesome/free-solid-svg-icons"


export default class Trending extends Component {
    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <FontAwesomeIcon id="left-right" icon={faAngleLeft} />
                <div className="trend-movie-section">
                    <MovieCard></MovieCard>
                    <MovieCard></MovieCard>
                    <MovieCard></MovieCard>
                    <MovieCard></MovieCard>

                </div> 
                <FontAwesomeIcon id="left-right" icon={faAngleRight} />
                          
            </div>

        )
    }
}

const MovieCard = () => {
    return (            
        <div className="movie-card">
            <NavLink to="/detail-movie/frozen2" className="img-wrapper">
                <img id="movie-image" src={imgMovie} alt="sth"></img>
            </NavLink>
            
            {/* <FontAwesomeIcon id="star" icon={faStar} /> 
            <p style={{display: 'inline'}} id="rank">10.0</p> */}
            <NavLink to="/detail-movie/frozen2" className="name-movie">
                <strong>Frozen 2</strong>
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
 