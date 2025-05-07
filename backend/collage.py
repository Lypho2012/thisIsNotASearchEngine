from PIL import Image
import numpy as np

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import httpx
import asyncio
import json

import os

class GoogleAuth(httpx.Auth):
    def __init__(self, credentials):
        self.credentials = credentials

    def auth_flow(self, request):
        access_token = self.credentials.token
        request.headers['Content-Type'] = 'application/json'
        request.headers['Authorization'] = f'Bearer {access_token}'
        yield request

def authenticate_google(secrets_file, scopes):
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", scopes)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                secrets_file, 
                scopes,
                redirect_uri="http://localhost:62314/"
            )
            creds = flow.run_local_server(port=62314)
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return creds

def get_avg_color(image,x,y):
    img_array = np.array(image)[x:x+10,y:y+10]
    return img_array.mean(axis=(0, 1))

def is_similar_color(color1, color2):
    return np.linalg.norm(color1 - color2) < 5

async def create_collage(background_image):
    creds = authenticate_google("backend/google_photos_picker_secret.json",["https://www.googleapis.com/auth/photospicker.mediaitems.readonly"])
    client = httpx.AsyncClient(auth=GoogleAuth(creds))
    google_photos = await client.post("https://photospicker.googleapis.com/v1/sessions")
    print(json.loads(google_photos.content.decode('utf-8'))["pickerUri"])
    
    return None

    # create image
    res_image = Image.new(mode="RGBA", size=background_image.size, color=(255,255,255,0))

    # randomly fill the image
    for x in range(0,background_image.width,10):
        for y in range(0,background_image.height,10):
            # avg color of this patch
            bg_avg_color = get_avg_color(background_image,x,y)
            # get a random image from photos and paste it if its avg color is close enough
            filler_image = None
            filler_avg_color = -bg_avg_color
            while not is_similar_color(bg_avg_color,filler_avg_color):
                filler_image = None
                filler_avg_color = get_avg_color(filler_image,0,0)

            # fix size of image and paste it
            min_dim = min(filler_image.width,filler_image.height)
            filler_image = filler_image.crop((0,0,min_dim,min_dim)).resize((10,10))
            res_image.paste(filler_image,(x,y))

    # save image
    # res_image_path = "src/image-compositions/collage.png"
    # res_image.save(res_image_path)
    # res_image.close()
    background_image.close()

if __name__ == "__main__":
    asyncio.run(create_collage(Image.open("backend/crepe.jpg")))