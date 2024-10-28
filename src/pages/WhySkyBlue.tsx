import React, { useEffect } from 'react'
import "./WhySkyBlue.css"
import SearchBar from './components/SearchBar.tsx'
import Google from './components/Google.tsx'
import SearchCategories from './components/SearchCategories.tsx'

function WhySkyBlue() {
  const search_results = [{link_name:"",link:"",summary:""}]
  useEffect(() => {
    let google_letters = document.getElementsByClassName("Google-letter")
    for (let google_letter of google_letters) {
      google_letter.style.fontSize = "30px"
    }
  })
  
  return (
    <div id="bluesky-div">
      <div id="bluesky-search-result-div">
        <div className="search-result-searchbar-div">
          <div className="search-result-google-div">
            <Google/>
          </div>
          <SearchBar prevSearchTerm="why is the sky blue"/>
        </div>
        <SearchCategories/>
        <div id="bluesky-search-result-list-div">
          {}
        </div>
      </div>
      <div id="sun"></div>
    </div>
  )
}

export default WhySkyBlue