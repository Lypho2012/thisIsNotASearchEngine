import React, { useContext } from 'react'
import ScrapedContext from '../contexts/scraped_context'
import "./VSCode.css"

function VSCode() {
    const {data, setData} = useContext(ScrapedContext)
    console.log(data)
    return (
        <div id="vscode-div">
            <div id="topbar">
                <button><img src={require("./vscode_logo.png")} alt="vscode logo" id="vscode-logo"/></button>
                <button>File</button>
                <button>Edit</button>
                <button>Selection</button>
                <button>View</button>
                <button>Go</button>
                <button>Run</button>
                <button>Terminal</button>
                <button>Window</button>
                <button>Help</button>
                <button><label>$(arrow-left)</label></button>
                <button>$(arrow-right)</button>
                <input
                id="search"
                value="Search"></input>
                <div id="">
                    <button>$(layout-sidebar-left)</button>
                </div>
            </div>
        </div>
    )
}

export default VSCode