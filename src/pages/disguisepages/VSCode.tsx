import React, { useContext, useEffect, useState } from 'react'
import ScrapedContext from '../contexts/scraped_context'
import "./VSCode.css"
import LeftArrow from "./arrow-left.svg"
import LayoutSidebarLeft from "./layout-sidebar-left.svg"
import LayoutSidebarRight from "./layout-sidebar-right.svg"
import LayoutPanel from "./layout-panel.svg"
import Layout from "./layout.svg"
import Files from "./files.svg"
import Search from "./search.svg"
import SourceControl from "./source-control.svg"
import Debug from "./debug-alt.svg"
import Extensions from "./extensions.svg"
import PythonLogo from "./python.svg"
import JupyterNotebookLogo from "./notebook.svg"
import Add from "./add.svg"
import RunAll from "./run-all.svg"
import ClearAll from "./clear-all.svg"
import Outline from "./list-unordered.svg"

function VSCode() {
    const {data, setData} = useContext(ScrapedContext)
    const file_type_icons = {"py":PythonLogo,"ipynb":JupyterNotebookLogo}
    console.log(data)
    const [files,setFiles] = useState({
        "notebook.ipynb":{
            "extension":"ipynb",
            "path":["notebook.ipynb"]
        },
        "example.ipynb":{
            "extension":"ipynb",
            "path":["example.ipynb"]
        }
    })
    const [activeTabs,setActiveTabs] = useState(["notebook.ipynb","example.ipynb"])
    const [selectedTab,setSelectedTab] = useState(activeTabs[0])

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
            <div id="main-content">
                <div id="sidebar">
                    <button><img src={Files} alt="files" className="sidebar-icons"/></button>
                    <button><img src={Search} alt="search" className="sidebar-icons"/></button>
                    <button><img src={SourceControl} alt="source" className="sidebar-icons"/></button>
                    <button><img src={Debug} alt="debug" className="sidebar-icons"/></button>
                    <button><img src={Extensions} alt="extensions" className="sidebar-icons"/></button>
                </div>
                <div id="sidebar-expanded">
                </div>
                <div id="middle-content">
                    <div id="file-tabs">
                        {activeTabs.map((tab,index) => {
                            let file = files[tab as keyof typeof files]
                            if (selectedTab == tab) {
                                return <div className='file-tab-selected' key={index}>
                                    <img src={file_type_icons[file.extension as keyof typeof file_type_icons]} alt={file.extension} className="filetype-icons"/>
                                    <div className='file-tab-name'>{tab}</div>
                                </div>
                            } else {
                                return <div className='file-tab' key={index}>
                                    <img src={file_type_icons[file.extension as keyof typeof file_type_icons]} alt={file.extension} className="filetype-icons"/>
                                    <div className='file-tab-name'>{tab}</div>
                                </div>
                            }
                        })}
                    </div>
                    <div id="file-topbar">
                        <div id="file-path">
                            {files[selectedTab as keyof typeof files].path.map((step) => {
                                return <div className='file-path-step'>{step+" >"}</div>
                            })}
                        </div>
                        <div id="ipynb-buttons">
                            <button className='ipynb-button'><div className='ipynb-button-content'><img src={Add} alt="add code" className="ipynb-icons"/> Code</div></button>
                            <button className='ipynb-button'><div className='ipynb-button-content'><img src={Add} alt="add markdown" className="ipynb-icons"/> Markdown</div></button>
                            <div className='separator'></div>
                            <button className='ipynb-button'><div className='ipynb-button-content'><img src={RunAll} alt="Run all" className="ipynb-icons"/> Run All</div></button>
                            <button className='ipynb-button'><div className='ipynb-button-content'><img src={ClearAll} alt="Clear all outputs" className="ipynb-icons"/> Clear All Outputs</div></button>
                            <div className='separator'></div>
                            <button className='ipynb-button'><div className='ipynb-button-content'><img src={Outline} alt="Outline" className="ipynb-icons"/> Outline</div></button>
                        </div>
                    </div>
                    <div id="file">
                        {data.map((element,index) => {
                            return <div>element</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VSCode