import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

class Node {
    children: Map<string, any>
    constructor() {
        this.children = new Map()
    }
    add(word: string) {
        let cur = this
        for (let i=0; i<word.length; i++) {
            cur.children.set(word[i].toLowerCase(),new Node())
            cur = cur.children.get(word[i].toLowerCase())
        }
    }
    search(word: string) {
        let cur = this
        for (let i=0; i<word.length; i++) {
            if (!cur.children.get(word[i].toLowerCase())) return []
            cur = cur.children.get(word[i].toLowerCase())
        }
        let results: string[] = []
        for (let [child,val] of cur.children) {
            let curResults = val.getWords()
            for (let result of curResults) {
                results.push(word+child+result)
            }
        }
        return results
    }
    getWords() {
      if (this.children.size == 0) return [""]
      let result: string[] = []
      for (let [child,val] of this.children) {
        let cur = val.getWords()
        for (let word of cur) {
            result.push(child+word)
        }
      }
      return result
    }
}
  
function createTrie(words) {
    var root = new Node()
    for (let word of words) {
        root.add(word)
    }
    return root
}
function Home() {
    const SEARCH_PROMPTS = ["Why is the sky blue", "I think I'm happy", "Crowdstrike"]
    var trieRoot = createTrie(SEARCH_PROMPTS)
    const [searchTerm, setSearchTerm] = useState("")
    const [suggested, setSuggested] = useState<string[]>([])
    const [searchActive, setSearchActive] = useState(false)
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        // display suggested searches
        setSuggested(trieRoot.search(searchTerm))
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // navigate to page
    }
    document.addEventListener("click", function(event) {
        if (event.target?.id == "search-bar-text") {
            var searchBar = document.getElementById("search-bar")
            if (searchBar) {
                searchBar.id = "search-bar-active"
                var boxShadow = document.getElementById("search-active-box-shadow")
                if (boxShadow) {
                    boxShadow.setAttribute("box-shadow","1px 1px 4px 1px rgba(0, 0, 0, 0.2)")
                }
                console.log(boxShadow?.attributes)
            }
            setSearchActive(true)
        } else {
            var searchBar = document.getElementById("search-bar-active")
            if (searchBar) {
                searchBar.id = "search-bar"
                var boxShadow = document.getElementById("search-active-box-shadow")
                if (boxShadow) {
                    boxShadow.setAttribute("box-shadow","none")
                }
                console.log(boxShadow?.attributes)
            }
            setSearchActive(false)
        }
    })
    
    return (
    <div id="Google-page">
        <div id="Google-header">
            <div id="big-g-letter" className="Google-letter">G</div>
            <div id="first-o-letter" className="Google-letter">o</div>
            <div id="second-o-letter" className="Google-letter">o</div>
            <div id="little-g-letter" className="Google-letter">g</div>
            <div id="l-letter" className="Google-letter">l</div>
            <div id="e-letter" className="Google-letter">e</div>
        </div>
        <div id="search-bar-div">
            <div id="search-active-box-shadow">
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
                {
                searchActive ?
                <div id="suggestions">
                    {suggested.map((suggestion) => {
                        return (
                            <div className="suggestion">
                                <svg className="suggestion-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px">
                                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                </svg>
                                <Link 
                                    to={"/"+encodeURIComponent(suggestion)}
                                    className="suggestion-link">
                                        {suggestion}
                                </Link>
                            </div>
                        )
                    })}
                </div> : null
                }
            </div>
        </div>
        
    </div>
    )
}

export default Home