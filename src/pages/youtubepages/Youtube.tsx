import { useState, ChangeEvent } from "react";
import "./Youtube.css"
import HomeSVG from "./home.svg"
import MenuSVG from "./menu.svg"
import SearchSVG from "./search.svg"
import VoiceSVG from "./mic-filled.svg"
import AddSVG from "./add.svg"
import NotificationSVG from "./bell.svg"
import ProfileSVG from "./account.svg"
import ShortsSVG from "./shorts.svg"
import YoutubeMusicSVG from "./youtube-music.svg"

function Youtube() {
    const [searchTerm, setSearchTerm] = useState("")

    // handle when search prompt is changed
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            setSearchTerm(event.target.value);
        }
    };
    // handle clearing search bar
    const handleXInput = () => {
        setSearchTerm("")
    }
    return (
        <div id="youtube-div">
            <div id="youtube-topbar">
                <button id="menu-button"><img src={MenuSVG} alt="menu" id="menu-icon"/></button>
                <button id="youtube-logo-button">
                    <img id="youtube-logo" src={require("./yt_logo_rgb_light.png")}/>
                </button>
                <div id="youtube-searchbar">
                    <input
                    id="searchbar"
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}/>
                    <button id="search-button"><img src={SearchSVG} alt="search" id="search-icon"/></button>
                    <button id="voice-button"><img src={VoiceSVG} alt="voice" id="voice-icon"/></button>
                </div>
                <div id="youtube-profile">
                    <button id="create-button">
                        <img src={AddSVG} alt="add" id="add-icon"/>
                        <b>Create</b>
                    </button>
                    <button id="notification-button"><img src={NotificationSVG} alt="notification" id="notification-icon"/></button>
                    <button id="profile-button"><img src={ProfileSVG} alt="profile" id="profile-icon"/></button>
                </div>
            </div>
            <div id="horizontal-youtube-main-div">
                <div id="youtube-sidebar">
                    <button className="youtube-sidebar-button">
                        <img src={HomeSVG} alt="home" className="youtube-sidebar-icon"/>
                        <div>Home</div>
                    </button>
                    <button className="youtube-sidebar-button">
                        <img src={ShortsSVG} alt="shorts" className="youtube-sidebar-icon"/>
                        Shorts
                    </button>
                    <button className="youtube-sidebar-button">
                        <img src={require("./subscriptions.png")} alt="subscriptions" className="youtube-sidebar-icon"/>
                        Subscriptions
                    </button>
                    <button className="youtube-sidebar-button">
                        <img src={YoutubeMusicSVG} alt="youtube-music" className="youtube-sidebar-icon"/>
                        Youtube Music
                    </button>
                    <button className="youtube-sidebar-button">
                        <img src={ProfileSVG} alt="you" className="youtube-sidebar-icon"/>
                        You
                    </button>
                    <button className="youtube-sidebar-button">
                        <img src={require("./download.png")} alt="download" className="youtube-sidebar-icon"/>
                        Downloads
                    </button>
                </div>
                <div id="main-content">
                    <div id="tags"></div>
                    <div className="rows">
                        <div className="row">
                            <div className="video">
                                <div className="thumbnail"></div>
                                <div className="channel-pfp"></div>
                                <div className="video-name"></div>
                                <div className="channel-name"></div>
                                <div className="stats"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Youtube