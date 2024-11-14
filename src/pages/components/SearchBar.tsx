import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./SearchBar.css"

// dependency note: also need to install @emotion/react and @emotion/styled when installing this package
import Alert from '@mui/material/Alert'; 

class Node {
    children: Map<string, Node[]>
    constructor() {
        this.children = new Map()
    }
    add(word: string) {
        let cur: Node = this
        for (let i=0; i<word.length; i++) {
            if (!cur.children.get(word[i].toLowerCase())) {
                cur.children.set(word[i].toLowerCase(),[])
            }
            let next = new Node()
            cur.children.get(word[i].toLowerCase())?.push(next)
            cur = next
        }
    }
    search(word: string) {
        /*
        For each character in a string, find all the nodes that are the children from the current node
        that start with that character, then repeat
         */
        let curChar:Node[] = []
        let nextChar:Node[] = []
        nextChar.push(this)
        for (let i=0; i<word.length; i++) {
            curChar = nextChar
            nextChar = []
            if (curChar.length == 0) return []
            while (curChar.length > 0) {
                let cur = curChar.shift()
                if (!cur) continue
                for (let child of cur.children.get(word[i].toLowerCase()) || []) {
                    nextChar.push(child)
                }
            }
        }
        let results: string[] = []
        for (let child of nextChar) {
            let curResults = child.getWords()
            for (let result of curResults) {
                results.push(word+result)
            }
        }
        return results
    }
    getWords() {
      if (this.children.size == 0) return [""]
      let result: string[] = []
      for (let char of this.children.keys()) {
        const val = this.children.get(char)
        if (!val) continue
        for (let child of val) {
            let cur = child.getWords()
            for (let word of cur) {
                result.push(char+word)
            }
        }
      }
      return result
    }
}
  
function createTrie(words:string[]) {
    var root = new Node()
    for (let word of words) {
        root.add(word)
    }
    return root
}
function SearchBar({prevSearchTerm=""}) {
    const SEARCH_PROMPTS = ["why is the sky blue", "i think im happy", "crowdstrike", "what day is it today"]
    const trieRoot = createTrie(SEARCH_PROMPTS)
    const [searchTerm, setSearchTerm] = useState(prevSearchTerm)
    const [suggested, setSuggested] = useState<string[]>(trieRoot.search(searchTerm))
    const [searchActive, setSearchActive] = useState(false)
    const [handleSubmit, setHandleSubmit] = useState(false)
    const [wrongSearch, setWrongSearch] = useState(false)
    const [impoliteSearch, setImpoliteSearch] = useState(false)
    const [learnedPlease, setLearnedPlease] = useState(false)
    const [badSearchCount, setBadSearchCount] = useState(0)
    const impoliteSearchHints = ["That's not very polite","Have you tried saying please?","You know what the magic word is"]
    const [impoliteSearchHint, setImpoliteSearchHint] = useState("")
    const navigate = useNavigate();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            setSearchTerm(event.target.value);
            handleSearchActive(event)
        }
    };
    useEffect(() => {
        if (handleSubmit) {
            setHandleSubmit(false)
            setWrongSearch(true)
            for (let prompt of SEARCH_PROMPTS) {
                if (searchTerm.toLowerCase().indexOf("please") >= 0 && searchTerm.toLowerCase().indexOf(prompt.toLowerCase()) >= 0) {
                    setImpoliteSearch(false)
                    setWrongSearch(false)
                    setLearnedPlease(true)
                    navigate("/"+encodeLink(prompt),{state: {searchTerm: searchTerm}})
                }
                if (searchTerm.toLowerCase().indexOf("please") < 0 && searchTerm.toLowerCase().indexOf(prompt.toLowerCase()) >= 0) {
                    setImpoliteSearch(true)
                    setImpoliteSearchHint(impoliteSearchHints[Math.floor(Math.random()*impoliteSearchHints.length)])
                    setWrongSearch(false)
                }
            }
            setTimeout(() => {
                setBadSearchCount(badSearchCount+1)
                console.log(badSearchCount)
            },1000)
            setTimeout(() => {
                setImpoliteSearch(false);
                setWrongSearch(false);
            }, 5000)
        }
    })
    useEffect(() => {
        if (badSearchCount >= 3) {
            navigate("/virus")
        }
    })
    const handleSearchActive = (event: Event | ChangeEvent<HTMLInputElement>) => {
        setSuggested(trieRoot.search(searchTerm))
        const target = event.target as HTMLElement
        if (target?.id == "search-bar-text") {
            let searchBar = document.getElementById("search-bar")
            if (!searchBar) {searchBar = document.getElementById("search-bar-active")}
            if (searchBar) {
                searchBar.id = "search-bar-active"
                let boxShadowElement = document.getElementById("search-active-box-shadow")
                if (boxShadowElement) {
                    boxShadowElement.style.boxShadow = "1px 1px 4px 1px rgba(0, 0, 0, 0.2)"
                }
                setSearchActive(true)
            }
        } else {
            let searchBar = document.getElementById("search-bar-active")
            if (!searchBar) {searchBar = document.getElementById("search-bar")}
            if (searchBar) {
                searchBar.id = "search-bar"
                let boxShadowElement = document.getElementById("search-active-box-shadow")
                if (boxShadowElement) {
                    boxShadowElement.style.boxShadow = ""
                }
                setSearchActive(false)
            }
        }
    }
    const handleXInput = () => {
        setSearchTerm("")
    }
    document.addEventListener("click", function(event) {
        handleSearchActive(event)
        const target = event.target as HTMLElement
        if (target?.className == "suggestion" 
            || target?.className == "suggestion-text") {
            setHandleSubmit(true)
            setSearchTerm(target?.innerText)
        } else if (target?.className == "suggestion-search-icon") {
            setHandleSubmit(true)
            const nextSibling = target.nextSibling as HTMLElement
            setSearchTerm(nextSibling.innerText)
        }
    })
    document.addEventListener("keydown", function(event) {
        if (event.code == "Enter") {
            setHandleSubmit(true)
        }
    })
    function encodeLink(name: string) {
        name = name.toLowerCase()
        name = name.split(" ").join("+")
        let res = ""
        for (let i=0; i<name.length; i++) {
            if (name[i].match(/^[0-9a-z]+$/)) {
                res += name[i]
            }
        }
        return name
    }
    return (
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
                <button id="search-x-button" onClick={handleXInput}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
                {learnedPlease ?
                    <>
                        <input id="please-button" type="checkbox"/>
                        <div id="please-button-text">Please</div>
                    </> : null
                }
            </div>
            {
            searchActive ?
            <div id="suggestions">
                {suggested.map((suggestion,index) => {
                    if (index == suggested.length-1) {
                        return (
                            <div key={suggestion} id="last-suggestion" className="suggestion">
                                <svg className="suggestion-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px">
                                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                </svg>
                                <p className="suggestion-text">
                                    {suggestion}
                                </p>
                            </div>
                        )
                    }
                    return (
                        <div key={suggestion} className="suggestion">
                            <svg className="suggestion-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                            </svg>
                            <div className="suggestion-text">
                                {suggestion}
                            </div>
                        </div>
                    )
                })}
            </div> : null
            }
        </div>
        {wrongSearch ? <Alert variant="filled" severity="error" className='search-error'>That's not a valid search prompt</Alert>:null}
        {impoliteSearch ? <Alert variant="filled" severity="warning" className='search-error'>{impoliteSearchHint}</Alert>:null}
    </div>
    )
}

export default SearchBar