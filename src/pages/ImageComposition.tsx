import axios from "axios";
import React, { ChangeEvent, useState } from "react";

function ImageComposition() {
  const [backgroundImage,setBackgroundImage] = useState<File|null>(null)
  const [fillerImage,setFillerImage] = useState<File|null>(null)
  const [resultImage,setResultImage] = useState("")
  const makeImage = async () => {
    const form = new FormData()
    if (backgroundImage) {
      form.append('background_image_file',backgroundImage)
    }
    if (fillerImage) {
      form.append('filler_image_file',fillerImage)
    }

    axios.post('http://localhost:8000/create-image-composition', form)
      .then(result => {
        setResultImage(".."+result["data"]["res"]);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }
  const onBackgroundImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setBackgroundImage(event.target.files[0])
    }
  }
  const onFillerImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFillerImage(event.target.files[0])
    }
  }
  return (
    <div>
      <h1>Make an image composition!</h1>
      <p>Choose 2 images, a background image (preferably has a transparent background and is only filled in at the desired outline to be filled) and a filler image, and this magic box will generate a composition where the filler image randomly populates the background image.</p>
      <div style={{"margin":"20px"}}>
        Select background image:
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onBackgroundImageChange}
      />
      <div style={{"margin":"20px"}}>
        Select filler image:
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onFillerImageChange}
      />
      <br/>
      <button onClick={makeImage} style={{"margin":"20px"}}>Create</button>
      <br/>
      {resultImage ? <img src={require("../image-compositions/composition.png")}/>: <></>}
      
    </div>
  )
}

export default ImageComposition