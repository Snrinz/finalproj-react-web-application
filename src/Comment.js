import React, { Component } from 'react'
import defaultUser from './img/default_user.png'

export default class Comment extends Component {
    render() {
        return (
            <div>

                <div class="comment-section">
                    <div class="comment-about">                        
                        <div class="comment-user">       
                            <img id="img-user-comment" src={defaultUser} />
                            <div class="information-user">
                                <span id="usrname">User</span>
                                <span id="date-post">19 Feb 2020</span>
                                <span id="time">1 hour ago</span>  
                            </div>                            
                        </div>
                        <p id="text-comment">ขอฟรีได้ปะคะ อยากได้มากเลย จะเอา</p>
                    </div>
                </div>
                
            </div>
        )
    }
}
