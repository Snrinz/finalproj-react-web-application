import React, { Component } from 'react'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//library for MovieCard
import { NavLink } from 'react-router-dom'
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default class Trending extends Component {
    state = {
        onair_list: [],
        most_list: [],
        coming_list: []
    }

    componentDidMount () {
        fetch(`/api/moviecomingsoon?length=100`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("data is " + res.movies[0].name);            
            this.setState({onair_list: res.movies})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        }) 
        
    }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>

                <FontAwesomeIcon id="left-right" icon={faAngleLeft} />
                <div className="trend-movie-section">
                    {
                        // this.displayMovieCard()
                        <React.Fragment>
                            {
                                 this.state.onair_list.map(movie => (
                                     <MovieCard key={movie.id} movie={movie} />
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
            <NavLink to={`/detail-movie/${movie._id}`} className="img-wrapper">
                <img id="movie-image" src={`./img/${movie.photo}`} 
                alt={movie.photo}></img>
            </NavLink>
            
            <div class="rating-section">
                <FontAwesomeIcon  id="star" icon={faStar} /> {movie.rating}
            </div>

            <NavLink to={`/detail-movie/${movie._id}`} id="name-movie">
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