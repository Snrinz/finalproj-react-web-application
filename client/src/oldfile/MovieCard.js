import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import imgMovie from './img/Frozen-2.jpg'
import WatchListButton from './WatchListButton'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faStar } from "@fortawesome/free-solid-svg-icons"

// เว็บสวยๆที่น่าสนใจ https://www.ibdb.com/
export default class MovieCard extends Component {
    render() {
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

                <WatchListButton></WatchListButton>              
            </div>
        )
    }
}
