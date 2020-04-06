import React, { Component } from 'react'
import imgMovie from './img/Frozen-2.jpg'

export default class DetailMovie extends Component {
    render() {
        let {match} = this.props;
        return (
            
            <div>
            <h3>ID: {match.params.test}</h3>
          </div>
            // <div className="detail-movie-section">
            //     <p>{match.params.test}</p>
            //     {/* <span>
            //         มาหน้าใหม่แล้วจ้า
            //     </span>
            //     <button>fdsfsdfsdfsdf</button>
            //     <Link to="/">GOOOO!!!!</Link>
            //     Trending On Air */}
            //     <div className="image-detail-wrapped">
            //         <img id="image-detail-movie" src={imgMovie} alt="sth" />
            //     </div>
                
            // </div>
        )
    }
}
