import requests
from bs4 import BeautifulSoup
from PIL import Image, UnidentifiedImageError
from serpapi import GoogleSearch
import os
from dotenv import load_dotenv

def getTodays():
    '''get today's national day'''
    r = requests.get("https://nationaltoday.com/today/")
    soup = BeautifulSoup(r.content, 'html5lib')

    top_days = []
    # add all normal days
    for row in soup.find_all('div', attrs = {'class':'day-card day-card-normal'}):
        day = row.find('h3', attrs = {'class':'holiday-title'}).text
        share = row.find('div', attrs={'class':'trending-share-count'})
        if share:
            share_count = share.text.split(" ")[0]
            if share_count[-1].lower() == 'k':
                share_count = share_count[:-1]+"000"
            top_days.append((int(share_count), day))

    # add trending day
    top_day = soup.find('div', attrs = {'class':'day-card day-card-featured'})
    day = top_day.find('h3', attrs = {'class':'holiday-title'}).text
    share = top_day.find('div', attrs={'class':'trending-share-count'})
    share_count = "0"
    if share:
        share_count = share.text.split(" ")[0]
    if share_count[-1].lower() == 'k':
        share_count = share_count[:-1]+"000"
    top_days.append((int(share_count), day))

    # get the most popular days
    top_days.sort(reverse=True)
    top_days = top_days[-6:]
    return top_days


def search_google(query, SERPAPI_API_KEY):
    class NoCorrespondingImageException(Exception):
        def __init__(self, *args):
            super().__init__(*args)
    params = {
    "q": query,
    "engine": "google_images",
    "ijn": "0",
    "api_key": SERPAPI_API_KEY
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    images_results = results["images_results"]

    for i in range(len(images_results)):
        try:
            return Image.open(requests.get(images_results[i]["original"], stream=True).raw)
        except UnidentifiedImageError:
            continue
    raise NoCorrespondingImageException(query)

def search_google_for_days():
    '''search google for an image for each holiday today'''
    top_days = getTodays()
    load_dotenv()
    SERPAPI_API_KEY = os.getenv('SERPAPI_API_KEY')
    images = []
    for day in top_days:
        img = search_google(day[1], SERPAPI_API_KEY)
        images.append(img)
    return images

def preprocess_image(img, min_width, min_height):
    # make sure images are at least the min dimensions before cropping
    if img.width < min_width:
        img = img.resize((min_width,int(min_width/img.width*min_height)))
    if img.height < min_height:
        img = img.resize((int(min_height/img.height*min_width),min_height))
    return img

def compose_banner() -> Image:
    '''compose google banner'''
    images = search_google_for_days()
    width = 1000
    height = int(2*width/5)
    res = Image.new("RGB",(width,height))

    width_other = int(width/7) #width for image behind G
    width_g = width_other*2 #width for image behind other letters

    # crop images to the proportion of a letter in the google logo
    for index, image in enumerate(images):
        if index == 0:
            image = preprocess_image(image,width_g,height)
            image = image.crop((int(images[0].width/2 - width_g/2), int(images[0].height/2 - height/2), int(images[0].width/2 + width_g/2), int(images[0].height/2 + height/2)))
            res.paste(image,(0,0))
        else:
            image = preprocess_image(image,width_other,height)
            image = image.crop((int(image.width/2 - width_other/2), int(image.height/2 - height/2), int(image.width/2 + width_other/2), int(image.height/2 + height/2)))
            res.paste(image,((index-1)*width_other+width_g,0))
    image_path = "src/pages/components/banner.png"
    res.save(image_path)
    return res
