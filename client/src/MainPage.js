import React, { Component } from 'react'
import Homepage from './Homepage'
// import Mostrating  from './Mostrating'
// import Comingsoon from './Comingsoon'


import Trailer from './Trailer'

export default class Index extends Component {
    render() {
        return (
            <div>
                {/* <h1 className="heading-label">Trending On Air</h1> */}
                < Homepage />
                {/* <h1 className="heading-label">Trending On Air</h1>
                <Trending />
                <h1 className="heading-label">Trending On Air</h1>
                <Trending /> */}
                <h1 className="heading-label">Trailer & Video</h1>
                <Trailer />

                {/* <h1 className="heading-label">Top 10 Rating</h1> */}
            </div>
        )
    }
}
