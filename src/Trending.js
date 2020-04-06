import React, { Component } from 'react'
import MovieCard from './MovieCard'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
