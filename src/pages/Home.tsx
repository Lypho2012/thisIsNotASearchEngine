import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import SearchBar from './components/SearchBar.tsx'
import Google from './components/Google.tsx'

function Home() {
    console.log("home page loaded")
    let google_letters = document.getElementsByClassName("Google-letter")
    for (let google_letter of google_letters) {
        google_letter.setAttribute("font-size","100px")
    }
    return (
    <div id="Google-page">
        <div id="Google-topbar">
            <Link className="Google-topbar-components" to="/about">About</Link>
            <div className="Google-topbar-components">Store</div>
            <div id="Google-topbar-components-right-div">
                <div className="Google-topbar-components">Gmail</div>
                <div className="Google-topbar-components">Images</div>
                <svg className="Google-topbar-components" viewBox="0 0 24 24" id="Google-topbar-menu">
                    <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"/>
                </svg>
                <div className="Google-topbar-components" id="Google-topbar-signin">
                    <p id="Google-topbar-signin-text">Sign in</p>
                </div>
            </div>
        </div>
        <Google/>
        <SearchBar/>
        <div id="Google-bottom-bar">
            <div className="Google-bottom-bar-components">Google Search</div>
            <div className="Google-bottom-bar-components">I'm Feeling Lucky</div>
        </div>
    </div>
    )
}

export default Home