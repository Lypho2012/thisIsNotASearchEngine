import { useState, ChangeEvent } from "react";
import "./Youtube.css"
import HomeSVG from "./home.svg"
import MenuSVG from "./menu.svg"
import SearchSVG from "./search.svg"
import XSVG from "./x.svg"
import VoiceSVG from "./mic-filled.svg"
import AddSVG from "./add.svg"
import NotificationSVG from "./bell.svg"
import ProfileSVG from "./account.svg"

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
                    <button id="search-x-button" onClick={handleXInput}><img src={XSVG} alt="clear" id="x-icon"/></button>
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

            <div id="youtube-sidebar">
            </div>
        </div>
    )
}

export default Youtube