'''
Start server by running fastapi dev main.py
'''
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
from PIL import Image
import random
from io import BytesIO
from today_image import compose_banner
from collage import create_collage_from_photos

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/create-today-google-banner")
async def getTodayImage():
    compose_banner()

@app.post("/create-image-composition")
async def createImageComposition(background_image_file: UploadFile = File(), filler_image_file: UploadFile = File()):
    # open input images
    # wallpaper_image = Image.open("/Users/zhang/Documents/Screenshot 2025-02-07 at 5.12.28 PM.png")
    # wallpaper_image = wallpaper_image.resize((int(wallpaper_image.width/2),int(wallpaper_image.height/2)))
    background_contents = await background_image_file.read()
    background_image_stream = BytesIO(background_contents)
    background_image = Image.open(background_image_stream)

    filler_contents = await filler_image_file.read()
    filler_image_stream = BytesIO(filler_contents)
    filler_image = Image.open(filler_image_stream)
    filler_image = filler_image.resize((int(filler_image.width/50),int(filler_image.height/50)))

    mask = filler_image.split()[3]

    # create image
    # res_image = wallpaper_image
    res_image = Image.new(mode="RGBA", size=background_image.size, color=(255,255,255,0))
    # res_image = background_image.copy()

    # randomly fill the image
    count = 700
    while count > 0:
        x = random.randint(0,background_image.width-1)
        y = random.randint(0,background_image.height-1)

        # draw the filler image if the pixel at (x,y) is not transparent
        if background_image.getpixel((x,y))[3] != 0:
            res_image.paste(filler_image,(x,y),mask)
            count -= 1

    # save image
    date = datetime.now()
    res_image_path = "src/image-compositions/composition.png"#+date.strftime("%Y-%m-%d_%H-%M-%S")+".png"
    res_image.save(res_image_path)
    background_image.close()
    filler_image.close()
    res_image.close()

    return JSONResponse({"res": res_image_path[3:]})

@app.post("/create-collage")
async def createCollage(background_image_file: UploadFile = File()):
    # open input images
    background_contents = await background_image_file.read()
    background_image_stream = BytesIO(background_contents)
    background_image = Image.open(background_image_stream)

    create_collage_from_photos(background_image)
    background_image.close()
