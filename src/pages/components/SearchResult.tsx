import React from 'react'
import { Link } from 'react-router-dom'
import "./SearchResult.css"

function SearchResult(state:{link:string ,link_name:string,summary:string}) {
  return (
    <div className="search-result">
        <Link className="search-result-link" to={state.link}>{state.link_name}</Link>
        <p className="search-result-summary">{state.summary}</p>
    </div>
  )
}

export default SearchResult