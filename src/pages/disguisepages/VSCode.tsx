import React, { useContext } from 'react'
import ScrapedContext from '../contexts/scraped_context'
import "./VSCode.css"
import LeftArrow from "./arrow-left.svg"
import LayoutSidebarLeft from "./layout-sidebar-left.svg"
import LayoutSidebarRight from "./layout-sidebar-right.svg"
import LayoutPanel from "./layout-panel.svg"
import Layout from "./layout.svg"

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
                <button><img src={LeftArrow} alt="left arrow" className='topbar-icons'/></button>
                <button><img src={LeftArrow} alt="right arrow" className="topbar-icons" id="right-arrow"/></button>
                <input
                id="search"
                value="Search"></input>
                <div id="topbar-right">
                    <button><img src={LayoutSidebarLeft} alt="layout sidebar left" className="topbar-icons"/></button>
                    <button><img src={LayoutPanel} alt="layout panel" className="topbar-icons"/></button>
                    <button><img src={LayoutSidebarRight} alt="layout sidebar right" className="topbar-icons"/></button>
                    <button><img src={Layout} alt="layout" className="topbar-icons"/></button>
                </div>
            </div>
        </div>
    )
}

export default VSCode