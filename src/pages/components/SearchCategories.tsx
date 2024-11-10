import React, { useState, useEffect } from 'react'
import "./SearchCategories.css"

function SearchCategories() {
    const categories = ["search-category-all","search-category-images","search-category-videos","search-category-shopping","search-category-news","search-category-forums","search-category-web"]
    const [selectedCategory, setSelectedCategory] = useState("all")
    const handleChooseCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement
        setSelectedCategory(target.innerText.toLowerCase())
    }
    useEffect(() => {
        for (let category of categories) {
            let button = document.getElementById(category);
            if (category == "search-category-"+selectedCategory) {
                if (button) {
                    button.style.borderBottom = "solid 3px"
                }
            } else {
                if (button) {
                    button.style.borderBottom = "none"
                }
            }
        }
    })
    return (
        <div id="search-categories">
            <button id="search-category-all" className="search-category" onClick={handleChooseCategory}>All</button>
            <button id="search-category-images" className="search-category" onClick={handleChooseCategory}>Images</button>
            <button id="search-category-videos" className="search-category" onClick={handleChooseCategory}>Videos</button>
            <button id="search-category-shopping" className="search-category" onClick={handleChooseCategory}>Shopping</button>
            <button id="search-category-news" className="search-category" onClick={handleChooseCategory}>News</button>
            <button id="search-category-forums" className="search-category" onClick={handleChooseCategory}>Forums</button>
            <button id="search-category-web" className="search-category" onClick={handleChooseCategory}>Web</button>
        </div>
    )
}

export default SearchCategories