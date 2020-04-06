import React, { Component } from 'react'
import SearchField from './SearchField'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

// icon awesome
// https://medium.com/@marstherice/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%83%E0%B8%8A%E0%B9%89-font-awesome-5-%E0%B8%81%E0%B8%B1%E0%B8%9A-react-160b34abd493

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav-section">
                <SearchField></SearchField>
                <div className="icon-section">
                    <Link to="/"><FontAwesomeIcon id="icon" icon={faHome} /></Link>
                    <FontAwesomeIcon id="icon" icon={faUser} />
                    <FontAwesomeIcon id="icon" icon={faCog} />                    
                </div>
            </div>
        )
    }
}
