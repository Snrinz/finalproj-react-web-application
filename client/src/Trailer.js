import React from 'react'
import imgTrailer from './img/trailer2.jpg'
import ReactPlayer from 'react-player'

const Trailer = () => {
    return (
        <div>
            <div className="trailer-section">
                <img id="trailer-image" src={imgTrailer}  alt="sth"></img>
                <ReactPlayer url="https://www.youtube.com/watch?v=3cxixDgHUYw" controls={true}></ReactPlayer>
            </div>
        </div>
    )
}

export default Trailer;

