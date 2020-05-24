import React, { useState, useEffect } from 'react'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Loading from "./Loading"

//library for MovieCard
import { NavLink } from 'react-router-dom'
import { faStar } from "@fortawesome/free-solid-svg-icons"

// API for Animation
import Aos from "aos"
import 'aos/dist/aos.css'

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
    const [pageOnair, setPageOnair] = useState(1)
    const [pageTopRate, setPageTopRate] = useState(1)
    const [pageComing, setPageComing] = useState(1)
    const limit = 4

    useEffect(() => {
        Aos.init({ duration: 2000})
    }, [])

    useEffect(() => {
        fetch(`/api/movieonair?page=${pageOnair}&&limit=${limit}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            setOnair_list({onair_list:res.movies, isLoad:false})
            console.log("size " + Object.keys(onair_list.onair_list).length);
            
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err));
            if(err.status === 404) return            
            setPageOnair(pageOnair-1)
        }) 
        console.log("pageOnair" + pageOnair);
    }, [pageOnair]);

    useEffect(() => {
        fetch(`/api/moviemostrating?page=${pageTopRate}&&limit=${limit}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res.status
        })
        .then(res =>{ 
            setMost_list({most_list:res.movies, isLoad:false})
            console.log("size " + Object.keys(most_list.most_list).length);
        })
        .catch(err => {
            if(err === 404) return 
            setPageTopRate(pageTopRate-1)
            console.log("error " + JSON.stringify(err)); 
        })      
        console.log("pageTopRate: " + pageTopRate);
        
    }, [pageTopRate])

    useEffect(() => {
        fetch(`/api/moviecomingsoon?page=${pageComing}&&limit=${limit}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res.status
        })
        .then(res =>{ 
            setComing_list({coming_list:res.movies, isLoad:false})
            console.log("size " + Object.keys(coming_list.coming_list).length);
        })
        .catch(err => {
            if(err === 404) return  
            console.log("error " + JSON.stringify(err)); 
            setPageComing(pageComing-1)
        }) 
        console.log("pageComing: " + pageComing);
        
    }, [pageComing])

    return (
            <div>
                {
                    (onair_list.isLoad)?
                        <Loading />
                    :
                        <div data-aos="fade-up" style={{margin: '50px'}}>
                            <NavLink id="title-summary" to={`/onairpage`} >
                                <h1 className="heading-label">Movie On Air</h1>
                            </NavLink>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {
                                (pageOnair === 1)?
                                "":
                                <FontAwesomeIcon id="left-right" onClick={() => {
                                    if(pageOnair === 1 ) return
                                    setPageOnair(pageOnair-1)
                                }} icon={faAngleLeft} />
                                }


                                <div className="trend-movie-section">
                                    <React.Fragment>
                                        {
                                            onair_list.onair_list.map(movie => (
                                                <MovieCard key={movie._id} movie={movie} />
                                            ))
                                        }
                                    </React.Fragment>       
                                </div> 

                                <FontAwesomeIcon id="left-right" onClick={() => {
                                    if((Object.keys(onair_list.onair_list).length%4) === 0)
                                    setPageOnair(pageOnair+1)
                                }}  icon={faAngleRight} />
                            </div>
                        </div>
                }

                {
                    (most_list.isLoad)?
                        <Loading />
                    :
                        <div data-aos="fade-up" style={{margin: '50px'}}>
                            <NavLink id="title-summary" to={`/toppage`} >
                                <h1 className="heading-label">Top Rating</h1>
                            </NavLink>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {
                                    (pageTopRate === 1)?
                                    "":
                                    <FontAwesomeIcon id="left-right" onClick={() => {
                                        if(pageTopRate === 1) return
                                        setPageTopRate(pageTopRate-1)
                                    }} icon={faAngleLeft} />
                                }
                                <div className="trend-movie-section">
                                    <React.Fragment>
                                        {
                                            most_list.most_list.map(movie => (
                                                <MovieCard key={movie._id} movie={movie} />
                                            ))
                                        }
                                    </React.Fragment>
                                    
                                </div> 
                                <FontAwesomeIcon id="left-right" onClick={() => {
                                    if((Object.keys(most_list.most_list).length%4) === 0)
                                    setPageTopRate(pageTopRate+1)
                                }} icon={faAngleRight} />
                            </div>
                        </div>
                }

                {
                    (coming_list.isLoad)?
                        <Loading />
                    :
                        <div data-aos="fade-up" style={{margin: '50px'}}>
                            <NavLink id="title-summary" to={`/comingpage`} >
                                <h1  className="heading-label">Coming Zoon</h1>
                            </NavLink>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {
                                    (pageComing === 1)?
                                    "":
                                    <FontAwesomeIcon id="left-right" onClick={() => {
                                        if(pageComing === 1) return
                                        setPageComing(pageComing-1)
                                    }} icon={faAngleLeft} />                                    
                                }

                                <div className="trend-movie-section">
                                    <React.Fragment>
                                        {
                                            coming_list.coming_list.map(movie => (
                                                <MovieCard key={movie._id} movie={movie} />
                                            ))
                                        }
                                    </React.Fragment>
                                    
                                </div> 
                                <FontAwesomeIcon id="left-right" onClick={() => {
                                    setPageComing(pageComing+1)
                                }} icon={faAngleRight} />
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