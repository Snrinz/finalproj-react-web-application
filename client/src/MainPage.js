import React, { Component } from 'react'
import Homepage from './Homepage'
// import Mostrating  from './Mostrating'
// import Comingsoon from './Comingsoon'


import Trailer from './Trailer'

export default class Index extends Component {
    render() {
        return (
            <div>
                < Homepage />

                <h1 className="heading-label">Trailer & Video</h1>
                <Trailer />

            </div>
        )
    }
}
