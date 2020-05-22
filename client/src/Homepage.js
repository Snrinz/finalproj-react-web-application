import React, { useState, useEffect } from 'react'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Loading from "./Loading"

//library for MovieCard
import { NavLink } from 'react-router-dom'
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default function Homepage() {
    const [onair_list, setOnair_list] = useState({
        onair_list:[],
        isLoad:true
    })
    const [most_list, setMost_list] = useState({
        most_list:[],
        isLoad:true
    })
    const [coming_list, setComing_list] = useState({
        coming_list:[],
        isLoad:true
    })

    useEffect(() => {
        fetch(`/api/movieonair?length=4`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("data is " + res.movies[0].name);  
            setOnair_list({onair_list:res.movies, isLoad:false})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        }) 

        fetch(`/api/moviecomingsoon?length=4`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("data is " + res.movies[0].name);      
            setComing_list({coming_list:res.movies, isLoad:false})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        }) 

        fetch(`/api/moviemostrating?length=4`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("data is " + res.movies[0].name);      
            setMost_list({most_list:res.movies, isLoad:false})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        })       
    }, []);

        return (
            <div>

                {
                    (onair_list.isLoad)?
                        <Loading />
                    :
                        <div style={{margin: '50px'}}>
                            <NavLink id="title-summary" to={`/onairpage`} >
                                <h1 className="heading-label">Movie On Air</h1>
                            </NavLink>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <FontAwesomeIcon id="left-right" icon={faAngleLeft} />
                                <div className="trend-movie-section">
                                    <React.Fragment>
                                        {
                                            onair_list.onair_list.map(movie => (
                                                <MovieCard key={movie._id} movie={movie} />
                                            ))
                                        }
                                    </React.Fragment>
                                    
                                </div> 
                                <FontAwesomeIcon id="left-right" icon={faAngleRight} />
                            </div>
                        </div>
                }

                {
                    (most_list.isLoad)?
                        <Loading />
                    :
                        <div style={{margin: '50px'}}>
                            <NavLink id="title-summary" to={`/toppage`} >
                                <h1 className="heading-label">Top Rating</h1>
                            </NavLink>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <FontAwesomeIcon id="left-right" icon={faAngleLeft} />
                                <div className="trend-movie-section">
                                    <React.Fragment>
                                        {
                                            most_list.most_list.map(movie => (
                                                <MovieCard key={movie._id} movie={movie} />
                                            ))
                                        }
                                    </React.Fragment>
                                    
                                </div> 
                                <FontAwesomeIcon id="left-right" icon={faAngleRight} />
                            </div>
                        </div>
                }

                {
                    (coming_list.isLoad)?
                        <Loading />
                    :
                        <div style={{margin: '50px'}}>
                            <NavLink id="title-summary" to={`/comingpage`} >
                                <h1  className="heading-label">Coming Zoon</h1>
                            </NavLink>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <FontAwesomeIcon id="left-right" icon={faAngleLeft} />
                                <div className="trend-movie-section">
                                    <React.Fragment>
                                        {
                                            coming_list.coming_list.map(movie => (
                                                <MovieCard key={movie._id} movie={movie} />
                                            ))
                                        }
                                    </React.Fragment>
                                    
                                </div> 
                                <FontAwesomeIcon id="left-right" icon={faAngleRight} />
                            </div>
                        </div>
                }
 
                
            </div>
        )

}

const MovieCard = (props) => {
    const { movie } = props
    return (            
        <div className="movie-card">
            <NavLink to={`/detail-movie/${movie._id}`} className="img-wrapper">
                <img id="movie-image" src={`./img/${movie.photo}`} alt={movie.photo}></img>
            </NavLink>
            
            <div className="rating-section">
                <FontAwesomeIcon  id="star" icon={faStar} /> {movie.rating}
            </div>

            <NavLink to={`/detail-movie/${movie._id}`} id="name-movie">
                <strong>{movie.name}</strong>
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