import React, { Component } from 'react'
import Trending from './Trending' 
import Trailer from './Trailer'

export default class Index extends Component {
    render() {
        return (
            <div>
                <h1 className="heading-label">Trending On Air</h1>
                <Trending></Trending>

                <h1 className="heading-label">Trailer & Video</h1>
                <Trailer></Trailer>
            </div>
        )
    }
}
