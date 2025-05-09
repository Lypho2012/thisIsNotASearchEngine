import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
function Collage() {
    const [backgroundImage,setBackgroundImage] = useState<File|null>(null)
    const [resultImage,setResultImage] = useState("")
    const makeImage = async () => {
        const form = new FormData()
        if (backgroundImage) {
            form.append('background_image_file',backgroundImage)
        }

        axios.post('http://localhost:8000/create-collage', form)
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
    return (
        <div>
        <h1>Make a collage!</h1>
        <p>Choose a background image, and this magic box will generate a collage that uses images from your photos to randomly populates the background image.</p>
        <div style={{"margin":"20px"}}>
            Select background image:
        </div>
        <input
            type="file"
            accept="image/*"
            onChange={onBackgroundImageChange}
        />
        <br/>
        <button onClick={makeImage} style={{"margin":"20px"}}>Create</button>
        <br/>
        <img src={require("../image-compositions/collage.png")}/>
        </div>
    )
}

export default Collage