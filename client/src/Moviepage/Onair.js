import React, { Component } from 'react'
import axios from 'axios';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//library for MovieCard
import { NavLink } from 'react-router-dom'
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default class Onair extends Component {
    state = {
        onair_list: [],
        most_list: [],
        coming_list: []
    }

    componentDidMount () {
        // console.log("DID MOUNT");
        
        // //  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US&page=1`)
        // axios.get(`/api/movie`)
        // .then(res => {
        //     this.setState({trend_list: res.movies})
        // })
        // .catch(err => console.log(err)) 

        fetch(`/api/movieonair?length=100`)
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