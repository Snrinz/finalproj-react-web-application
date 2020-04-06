import React, { Component } from 'react'

export default class Post extends Component {
    render() {
        return (
            <div className="post-section">
                <textarea name="text-post" placeholder="Type text in here . ." /> 
                
                <input type="submit" value="SUBMIT" />

            </div>
        )
    }
}
