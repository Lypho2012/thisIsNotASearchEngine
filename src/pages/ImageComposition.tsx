import axios from "axios";
import { ChangeEvent, useState } from "react";

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

    axios.post('/create-image-composition', form)
      .then(data => {
        console.log(data);
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
      console.log(event.target.files)
      setFillerImage(event.target.files[0])
    }
  }
  return (
    <div>
      <div>
        Select background image
        <input
          type="file"
          accept="image/*"
          onChange={onBackgroundImageChange}
        />
      </div>
      <div>
        Select filler image
        <input
          type="file"
          accept="image/*"
          onChange={onFillerImageChange}
        />
      </div>
      <button onClick={makeImage}>Create</button>
      <img src={resultImage}/>
    </div>
  )
}

export default ImageComposition