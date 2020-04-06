import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default class SearchField extends Component {
    render() {
        return (
            <div>
                <FontAwesomeIcon icon={faSearch} />
                <input type="text" id="searchfield" name="searchfield" placeholder="Search movie . . ."></input>
            </div>
        )
    }
}
