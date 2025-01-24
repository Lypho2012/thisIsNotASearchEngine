import "./Youtube.css"
import HomeSVG from "./home.svg"

function Youtube() {
    return (
        <div id="youtube-div">
            <div id="youtube-topbar">
                <img id="expand-button"/>
                <button id="youtube-logo-button">
                    <img id="youtube-logo" src={require("./yt_logo_rgb_light.png")}/>
                </button>
                <div id="youtube-searchbar"></div>
                <div id="youtube-profile"></div>
            </div>

            <div id="youtube-sidebar">
                <button>
                    
                </button>
            </div>
        </div>
    )
}

export default Youtube