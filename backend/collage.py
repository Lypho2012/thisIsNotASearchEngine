from PIL import Image
import numpy as np

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import httpx
import asyncio
import json

import os

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

import time
import tqdm

from scipy.spatial import KDTree

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

def get_avg_color(image,x1,y1,x2,y2):
    img_array = np.array(image)[x1:x2,y1:y2]
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
    overlay = Image.new("RGB", image.size, (int(color[0]),int(color[1]),int(color[2])))
    return Image.blend(image, overlay, 0.5)

async def save_photos():
    creds = authenticate_google("backend/google_photos_picker_secret.json",["https://www.googleapis.com/auth/photospicker.mediaitems.readonly"])
    client = httpx.AsyncClient(auth=GoogleAuth(creds))

    # start a session
    google_photos = await client.post("https://photospicker.googleapis.com/v1/sessions")
    session_info = json.loads(google_photos.content.decode('utf-8'))
    url = session_info["pickerUri"]
    session_id = session_info["id"]
    print(url)

    # check when session is finished
    can_continue = False
    while not can_continue:
        time.sleep(5)
        google_photos = await client.get(f"https://photospicker.googleapis.com/v1/sessions/{session_id}")
        session_info = json.loads(google_photos.content.decode('utf-8'))
        can_continue = session_info["mediaItemsSet"]

    print("Session finished")

    # get selected photos
    nextPageToken = ""
    while True:
        google_photos = await client.get(f"https://photospicker.googleapis.com/v1/mediaItems?sessionId={session_id}&pageToken={nextPageToken}")
        session_info = json.loads(google_photos.content.decode('utf-8'))
        for photo in tqdm(session_info["mediaItems"]):
            photo_url = photo["mediaFile"]["baseUrl"]
            try:
                response = await client.get(photo_url)
                with open(f"backend/photos/{photo["mediaFile"]["filename"]}", 'wb') as file:
                    file.write(response.content)
            except:
                continue
        if "nextPageToken" in session_info:
            nextPageToken = session_info["nextPageToken"]
        else:
            break

def create_collage_from_photos(background_image):
    picked = {}
    for file in os.listdir("backend/photos"):
        image = Image.open(file)
        color = get_avg_color(image,0,0,image.width,image.height)
        picked[(int(color[0]),int(color[1]),int(color[2]))] = file
    colors = KDTree(np.array(list(picked.keys())))

    # create image
    RESOLUTION = 10
    PATCH_SIZE = 10
    res_image = Image.new(mode="RGB", size=(background_image.width*RESOLUTION,background_image.height*RESOLUTION), color=(255,255,255))
    used = [False]*len(picked)
    k = [1]*len(picked)

    # randomly fill the image
    for x in range(0,background_image.height-PATCH_SIZE,PATCH_SIZE):
        for y in range(0,background_image.width-PATCH_SIZE,PATCH_SIZE):
            print(x,y)
            # avg color of this patch
            bg_avg_color = get_avg_color(background_image,x,y,x+PATCH_SIZE,y+PATCH_SIZE)

            # get image with closest color, try not to repeat images
            while True:
                index = colors.query(bg_avg_color)[1]
                if used[index]:
                    k[index] = k[index]%10+1
                    _,indices = colors.query(bg_avg_color,k=k[index])
                    try:
                        index = indices[-1]
                    except:
                        index = indices
                used[index] = True
                color = colors.data[index]
                file = picked[(int(color[0]),int(color[1]),int(color[2]))]
                try:
                    filler_image = Image.open(file).convert("RGB")

                    # fix size of image and paste it
                    min_dim = min(filler_image.width,filler_image.height)
                    filler_image = filler_image.crop((0,0,min_dim,min_dim)).resize((PATCH_SIZE*RESOLUTION,PATCH_SIZE*RESOLUTION))
                    filler_image = tint(filler_image,bg_avg_color)
                    res_image.paste(filler_image,(y,x))
                    filler_image.close()
                    break
                except Exception as e:
                    print("Failed to open "+file,e)

    # save image
    res_image_path = "src/image-compositions/collage.png"
    res_image.save(res_image_path)
    res_image.close()
    background_image.close()

async def create_collage(background_image):
    creds = authenticate_google("backend/google_photos_picker_secret.json",["https://www.googleapis.com/auth/photospicker.mediaitems.readonly"])
    client = httpx.AsyncClient(auth=GoogleAuth(creds))

    # start a session
    google_photos = await client.post("https://photospicker.googleapis.com/v1/sessions")
    session_info = json.loads(google_photos.content.decode('utf-8'))
    url = session_info["pickerUri"]
    session_id = session_info["id"]
    print(url)

    # check when session is finished
    can_continue = False
    while not can_continue:
        time.sleep(5)
        google_photos = await client.get(f"https://photospicker.googleapis.com/v1/sessions/{session_id}")
        session_info = json.loads(google_photos.content.decode('utf-8'))
        can_continue = session_info["mediaItemsSet"]

    print("Session finished")

    # get selected photos
    picked = {}
    nextPageToken = ""
    while True:
        google_photos = await client.get(f"https://photospicker.googleapis.com/v1/mediaItems?sessionId={session_id}&pageToken={nextPageToken}")
        session_info = json.loads(google_photos.content.decode('utf-8'))
        for photo in session_info["mediaItems"]:
            photo_url = photo["mediaFile"]["baseUrl"]
            try:
                response = await client.get(photo_url)
                with open("temp_img.jpg", 'wb') as file:
                    file.write(response.content)
                image = Image.open("temp_img.jpg")
                color = get_avg_color(image,0,0,image.width,image.height)
                picked[(int(color[0]),int(color[1]),int(color[2]))] = photo_url
            except:
                continue
        if "nextPageToken" in session_info:
            nextPageToken = session_info["nextPageToken"]
        else:
            break
    colors = KDTree(np.array(list(picked.keys())))

    # create image
    RESOLUTION = 10
    PATCH_SIZE = 10
    res_image = Image.new(mode="RGB", size=(background_image.width*RESOLUTION,background_image.height*RESOLUTION), color=(255,255,255))
    used = [False]*len(picked)
    k = [1]*len(picked)

    # randomly fill the image
    for x in range(0,background_image.height-PATCH_SIZE,PATCH_SIZE):
        for y in range(0,background_image.width-PATCH_SIZE,PATCH_SIZE):
            print(x,y)
            # avg color of this patch
            bg_avg_color = get_avg_color(background_image,x,y,x+PATCH_SIZE,y+PATCH_SIZE)

            # get image with closest color, try not to repeat images
            while True:
                index = colors.query(bg_avg_color)[1]
                if used[index]:
                    k[index] = k[index]%10+1
                    _,indices = colors.query(bg_avg_color,k=k[index])
                    try:
                        index = indices[-1]
                    except:
                        index = indices
                used[index] = True
                color = colors.data[index]
                try:
                    response = await client.get(picked[(int(color[0]),int(color[1]),int(color[2]))])
                    with open("temp_img.jpg", 'wb') as file:
                        file.write(response.content)
                    filler_image = Image.open("temp_img.jpg").convert("RGB")

                    # fix size of image and paste it
                    min_dim = min(filler_image.width,filler_image.height)
                    filler_image = filler_image.crop((0,0,min_dim,min_dim)).resize((PATCH_SIZE*RESOLUTION,PATCH_SIZE*RESOLUTION))
                    filler_image = tint(filler_image,bg_avg_color)
                    res_image.paste(filler_image,(y,x))
                    filler_image.close()
                    break
                except Exception as e:
                    print("Failed to open "+picked[(int(color[0]),int(color[1]),int(color[2]))],e)

    # save image
    res_image_path = "src/image-compositions/collage.png"
    res_image.save(res_image_path)
    res_image.close()
    background_image.close()

if __name__ == "__main__":
    # asyncio.run(create_collage(Image.open("backend/mothersday.jpg")))
    asyncio.run(save_photos())