from PIL import Image
import numpy as np

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import httpx
import asyncio
import json

from dotenv import load_dotenv
import os

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

import time

import random
import urllib.request 

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

def select_all_images(url):
    query = os.getenv("GOOGLE_PHOTOS_QUERY")

    driver = webdriver.Chrome()
    driver.implicitly_wait(5)
    driver.get(url)

    # search for images
    while True:
        try:
            search_bar = driver.find_element(By.CSS_SELECTOR,f"[aria-label='Search your photos and albums']")
            search_bar.send_keys(query+" jpg")
            search_bar.send_keys(Keys.ENTER)
            break
        except:
            continue

    # select first image
    while True:
        try:
            first_image = driver.find_element(By.CSS_SELECTOR,f"[role='checkbox']")
            first_image.click()
            break
        except:
            continue

    # scroll to last image
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    driver.implicitly_wait(5)

    # shift click last image
    while True:
        try:
            last_image = driver.find_elements(By.CSS_SELECTOR,f"[role='checkbox']")[-1]
            ActionChains(driver) \
                .key_down(Keys.SHIFT) \
                .click(last_image) \
                .key_up(Keys.SHIFT) \
                .perform()
            break
        except:
            continue

    # click done
    # while True:
    #     try:
    #         done_button = driver.find_element_by_xpath("//div[text()='Done']")
    #         done_button.click()
    #         break
    #     except:
    #         continue

def tint(image,color):
    overlay = Image.new("RGBA", image.size, color + (0,))
    return Image.blend(image, overlay, 0.5)

async def create_collage(background_image):
    creds = authenticate_google("backend/google_photos_picker_secret.json",["https://www.googleapis.com/auth/photospicker.mediaitems.readonly"])
    client = httpx.AsyncClient(auth=GoogleAuth(creds))

    # start a session
    google_photos = await client.post("https://photospicker.googleapis.com/v1/sessions")
    session_info = json.loads(google_photos.content.decode('utf-8'))
    url = session_info["pickerUri"]
    session_id = session_info["id"]
    print(session_info)

    # check when session is finished
    can_continue = False
    while not can_continue:
        time.sleep(5)
        google_photos = await client.get(f"https://photospicker.googleapis.com/v1/sessions/{session_id}")
        session_info = json.loads(google_photos.content.decode('utf-8'))
        can_continue = session_info["mediaItemsSet"]

    # get selected photos
    picked = []
    nextPageToken = ""
    while True:
        google_photos = await client.get(f"https://photospicker.googleapis.com/v1/mediaItems?sessionId={session_id}&pageToken={nextPageToken}")
        session_info = json.loads(google_photos.content.decode('utf-8'))
        picked += [photo["mediaFile"]["baseUrl"] for photo in session_info["mediaItems"]]
        if "nextPageToken" in session_info:
            nextPageToken = session_info["nextPageToken"]
        else:
            break

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
            limit = 100
            while not is_similar_color(bg_avg_color,filler_avg_color) and limit > 0:
                if filler_image:
                    filler_image.close()

                response = await client.get(picked[random.randint(0,len(picked)-1)])
                with open("temp_img.jpg", 'wb') as file:
                    file.write(response.content)

                filler_image = Image.open("temp_img.jpg")
                filler_avg_color = get_avg_color(filler_image,0,0)
                limit -= 1

            # fix size of image and paste it
            min_dim = min(filler_image.width,filler_image.height)
            filler_image = filler_image.crop((0,0,min_dim,min_dim)).resize((10,10))
            filler_image = tint(filler_image,bg_avg_color)
            res_image.paste(filler_image,(x,y))
            filler_image.close()

    # save image
    res_image_path = "src/image-compositions/collage.png"
    res_image.save(res_image_path)
    res_image.close()
    background_image.close()

if __name__ == "__main__":
    asyncio.run(create_collage(Image.open("backend/crepe.jpg")))