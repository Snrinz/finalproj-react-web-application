import React, { Component } from 'react'
import imgTrailer from './img/trailer2.jpg'
import ReactPlayer from 'react-player'

export default class Trailer extends Component {
    render() {
        return (
            <div>
                <div className="trailer-section">
                    <img id="trailer-image" src={imgTrailer}  alt="sth"></img>
                    <ReactPlayer url="https://www.youtube.com/watch?v=3cxixDgHUYw" controls={true}></ReactPlayer>
                </div>
            </div>
        )
    }
}
