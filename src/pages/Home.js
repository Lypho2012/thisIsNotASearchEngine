import React, {useState} from 'react'
import './Home.css'

function Home() {
    const [searchTerm, setSearchTerm] = useState("")
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        // display suggested searches
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // navigate to page
    }
    return (
    <div id="Google-page">
        <div id="Google-header">
            <div id="big-g-letter" class="Google-letter">G</div>
            <div id="first-o-letter" class="Google-letter">o</div>
            <div id="second-o-letter" class="Google-letter">o</div>
            <div id="little-g-letter" class="Google-letter">g</div>
            <div id="l-letter" class="Google-letter">l</div>
            <div id="e-letter" class="Google-letter">e</div>
        </div>
        <div id="search-bar-div">
            <div id="search-bar">
                <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
                <input
                id="search-bar-text"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                />
            </div>
        </div>
    </div>
    )
}

export default Home