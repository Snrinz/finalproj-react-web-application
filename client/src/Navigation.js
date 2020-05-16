import React from 'react'
// import SearchField from './SearchField'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

// icon awesome
// https://medium.com/@marstherice/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%83%E0%B8%8A%E0%B9%89-font-awesome-5-%E0%B8%81%E0%B8%B1%E0%B8%9A-react-160b34abd493

const Navigation = () => {
    return (
        <nav className="nav-section">
            <div />
            <SearchField></SearchField>
            <div className="icon-section">
                <Link to="/"><FontAwesomeIcon id="icon" icon={faHome} /></Link>
                <FontAwesomeIcon id="icon" icon={faUser} />
                <FontAwesomeIcon id="icon" icon={faCog} />
                <Link to="/sign-up"><FontAwesomeIcon id="icon" icon={faUserPlus} /></Link>                    
            </div>
                {/* Modal */}
{/* https://codepen.io/designcouch/pen/obvKxm?__cf_chl_jschl_tk__=3ee3763e5eead6767d03beddc95a2bc3e8635f18-1586194370-0-Aa8YSwpBeb_sWyAN5c0Pej-Lvt3_gkSddiAzMUoypGoEQboiEH9zzMyfVSI7T08HY65hd3n3NNssaaVMoWtg5UT--Xs_Bi57lhKxtghGWygxswUrv9z76Ys11bT6HLhcU9qITJ1t6yPznCI34Lnom08S92P3WsBlN2wCDEt1uwLYHUaELYp3bW1FOtbUaFBCE7h4ZtquLbOKkdVtfE2Wg8WlHThaTVDeozZs44IzyjoveZss-Y7k0N8ouHrW3egkLEoRBJBGjzjk3ohhyGcZZB9SJrLtScsdmMfhidZMhZ5i_cD8fRQrzRJo6K7DMXFjGQF72hnFbUP9A590ULl04HOHll8TsYNwE78V39LSCQQq */}
            <Setting />
        </nav>
    )
    
}

const SearchField = () => {  
    return (
        <div className="search-section">
            <input type="text" id="searchfield" name="searchfield" placeholder="Search movie . . ."></input>
            <FontAwesomeIcon id="search-icon" icon={faSearch} />
        </div>
    ) 
}

const Setting = () => {
    return (
        <div>
        </div>
    )
}


export default Navigation;
