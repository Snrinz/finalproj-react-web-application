import React, { Component } from 'react'
import axios from 'axios';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//library for MovieCard
import { NavLink } from 'react-router-dom'
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default class Trending extends Component {
    state = {
        trend_list: []
    }

    componentDidMount () {
        console.log("DID MOUNT");
        
        //  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US&page=1`)
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=72c7a3ed944673d07bbf1b9b44dc7894&language=th&page=1`)
        .then(res => {
            this.setState({trend_list: res.data.results})
        })
        .catch(err => console.log(err)) 
    }

    // displayMovieCard = () => {
    //     for(let i=0 ; i<4 ; i++) {
    //         let card = []
    //         card.push(<MovieCard key={this.state.trend_list[i].id} movie={this.state.trend_list[i]} />)
    //         return card;
    //     }
    // }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>

                <FontAwesomeIcon id="left-right" icon={faAngleLeft} />
                <div className="trend-movie-section">
                    {
                        // this.displayMovieCard()
                        <React.Fragment>
                            {
                                 this.state.trend_list.map(movie => (
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
            <NavLink to={`/detail-movie/${movie.id}`} className="img-wrapper">
                <img id="movie-image" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                alt={movie.poster_path}></img>
            </NavLink>
            
            <div class="rating-section">
                <FontAwesomeIcon  id="star" icon={faStar} /> {movie.vote_average}
            </div>

            <NavLink to={`/detail-movie/${movie.id}`} id="name-movie">
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