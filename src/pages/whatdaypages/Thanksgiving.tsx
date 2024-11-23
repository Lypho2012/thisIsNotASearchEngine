import { useEffect } from 'react'
import "./Thanksgiving.css"

function Thanksgiving() {
  const numLeaves = 10 + 5*Math.random()
  useEffect(() => {
    for (let i=0; i<numLeaves; i++) {
      AnimateLeaf({i:i})
    }
  })
  
  return (
    <div id="thanksgiving-background-div">
      <div id="thanksgiving-div">
          <div>Happy Thanksgiving!</div>
      </div>
      {
        Array.from({length:numLeaves}).map((leaf,index) => {
          return <img className='leaf' id={"leaf"+index} src={require("./fall-leaf.png")} alt="leaf"></img>
        })
      }
    </div>
  )
}

function AnimateLeaf(props: { i: number }) {
  let leaf = document.getElementById("leaf"+props.i)
  if (leaf) {
    let start_x = Math.random() * (window.innerWidth - 100)
    let start_y = "-50px"
    let duration = 5000+6000*Math.random()
    leaf.style.top = start_y
    leaf.style.left = start_x + "px"
    leaf.style.transform = "rotate("+(360+300*Math.random())+"deg)"
    leaf.animate([
      {
        transform: 'translate('+start_x+'px,'+start_y+')'
      },
      {
        transform: 'translate('+(-50+100*Math.random())+'vw,110vh) rotate(360deg)'
      }
    ], 
    {
      duration: duration,
      iterations: Infinity
    })
  }
}

export default Thanksgiving