import React from 'react'
import "./Crowdstrike.css"

function Crowdstrike() {
  return (
    <div id="crowdstrike-div">
      <div id="big-smiley-face">:(</div>
      <div>
        Your PC ran into a problem and needs to restart. We're<br/>
        just collecting some error info, and then we'll restart for <br/>
        you.<br/>
        99% complete
      </div>
      <div>For more information about this issue and possible fixes, visit </div>
      <img id="qr_code" src={require("./components/bluescreenofdeath.png")}/>
      <div>If you call a support person, give them this info: </div>
      <div>What failed: Crowdstrike</div>
      <div>Stop Code: TIME_TO_SWITCH_OPERATING_SYSTEMS</div>
    </div>
  )
}

export default Crowdstrike