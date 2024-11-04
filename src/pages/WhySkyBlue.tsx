import React, { useEffect } from 'react'
import "./WhySkyBlue.css"
import SearchBar from './components/SearchBar.tsx'
import Google from './components/Google.tsx'
import SearchCategories from './components/SearchCategories.tsx'
import SearchResult from './components/SearchResult.tsx'

function WhySkyBlue() {
  const search_results = [
    {
      link_name:"Why is the sky blue?",
      link:"",
      summary:"Experts have been wondering for a few days about this big question."
    },
    {
      link_name:"Why is the sky blue - Denis Martindale",
      link:"poem",
      summary:"Now I know why the sky is blue..."
    },
  ]
  useEffect(() => {
    let google_letters = document.getElementsByClassName("Google-letter")
    for (let google_letter of google_letters) {
      google_letter.style.fontSize = "30px"
    }
  })

  document.addEventListener("scroll", (event) => {
    let blueskyDiv = document.getElementById("bluesky-div")
    if (blueskyDiv) {
      let filter = Math.sin(window.scrollY)
      blueskyDiv.style.filter = "brightness("+filter+")"
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
          {search_results.map((search_result) => {
            return (<SearchResult link={search_result.link} link_name={search_result.link_name} summary={search_result.summary}/>)
          })}
        </div>
      </div>
      <div id="sun"></div>
      <div id="moon"></div>
    </div>
  )
}

export default WhySkyBlue