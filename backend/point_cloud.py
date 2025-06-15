from collections import defaultdict
from PIL import Image
import numpy as np
import pyvista as pv
import random

RESOLUTION_STEP = 5
THRESHOLD_DEPTH = 10

'''
Plots point cloud given points and colors
'''
def plot(points,colors):
    point_cloud = pv.PolyData(points)
    point_cloud["colors"] = colors
    plotter = pv.Plotter()
    plotter.add_points(point_cloud, scalars="colors", rgb=True, point_size=10)
    plotter.show()

'''
Creates point cloud of 1 image with rand depth 
'''
def create_point_cloud(file):
    img = Image.open(f"backend/point_cloud_images/{file}")
    points = [(x,y,random.randint(0,500)) for y in range(0,img.height,RESOLUTION_STEP) for x in range(0,img.width,RESOLUTION_STEP)]
    colors = [img.getpixel((point[0],point[1])) for point in points]
    plot(points,colors)

'''
Gets the points in 2 files that have the same colors at the same y coord
(unused method)
'''
def get_intersecting_point_cloud(file1, file2):
    img1 = Image.open(f"backend/point_cloud_images/{file1}")
    img2 = Image.open(f"backend/point_cloud_images/{file2}")
    img2 = img2.resize((img2.width,img1.height))

    points = []
    colors = []
    for y in range(img1.height):
        row_colors = defaultdict(list)
        for x in range(img1.width):
            row_colors[img1.getpixel((x,y))].append(x)
        for x in range(img2.width):
            color = img2.getpixel((x,y))
            if len(row_colors[color]) != 0:
                z = row_colors[color].pop()
                points.insert([x,y,z])
                colors.insert(color)
    print(points,colors)

'''
Returns whether a point should be included with an inverse probability proportional to depth
'''
def should_include(rand_depth):
    prob = random.random()
    return rand_depth == 0 or prob < 300/rand_depth

'''
Creates point cloud of 4 images combined on 4 sides of a cube
'''
def create_point_cloud_combined(png, foreimage, foreimage2, foreimage3):
    img1 = Image.open(f"backend/point_cloud_images/{png}")
    img2 = Image.open(f"backend/point_cloud_images/{foreimage}")
    img3 = Image.open(f"backend/point_cloud_images/{foreimage2}")
    img4 = Image.open(f"backend/point_cloud_images/{foreimage3}")
    height = max(max(img2.height,img3.height),max(img1.height,img4.height))
    img1 = img1.resize((img1.width*height//img1.height,height))
    img2 = img2.resize((img2.width*height//img2.height,height))
    img3 = img3.resize((img3.width*height//img3.height,height))
    img4 = img4.resize((img4.width*height//img4.height,height))

    points = []
    for y in range(0,img1.height,RESOLUTION_STEP): 
        for x in range(0,img1.width,RESOLUTION_STEP):
            rand_depth = random.randint(THRESHOLD_DEPTH,img2.width)
            if img1.getpixel((x,y))[:3] != (255,255,255) and should_include(10*rand_depth):
                points.append((x,y,rand_depth))
    colors = [img1.getpixel((point[0],point[1]))[:3] for point in points]

    min_depths = dict()
    for point in points:
        if (point[2],point[1]) in min_depths:
            min_depths[(point[2],point[1])] = min(min_depths[(point[2],point[1])],point[0])
        else:
            min_depths[(point[2],point[1])] = point[0]

    for y in range(0,img2.height,RESOLUTION_STEP): 
        for x in range(0,img2.width,RESOLUTION_STEP):
            if len(img2.getpixel((x,y))) > 3 and img2.getpixel((x,y))[3] == 0:
                continue
            else:
                rand_depth = random.randint(0,img1.width)
                if (x,y) in min_depths:
                    rand_depth = random.randint(0,min_depths[(x,y)])
                if should_include(rand_depth):
                    points.append((rand_depth,y,x))
                    colors.append(img2.getpixel((x,y))[:3])

    for y in range(0,img3.height,RESOLUTION_STEP): 
        for x in range(0,img3.width,RESOLUTION_STEP):
            if len(img3.getpixel((x,y))) > 3 and img3.getpixel((x,y))[3] == 0:
                continue
            else:
                rand_depth = random.randint(0,img2.width)
                if should_include(5*rand_depth):
                    points.append((x+img1.width//2-img2.width//2,y,img2.width-rand_depth))
                    colors.append(img3.getpixel((x,y))[:3])

    for y in range(0,img4.height,RESOLUTION_STEP): 
        for x in range(0,img4.width,RESOLUTION_STEP):
            if len(img4.getpixel((x,y))) > 3 and img4.getpixel((x,y))[3] == 0:
                continue
            else:
                rand_depth = random.randint(0,img1.width)
                if should_include(5*rand_depth):
                    points.append((img1.width-rand_depth,y,x))
                    colors.append(img4.getpixel((x,y))[:3])
    plot(points,colors)

create_point_cloud_combined("happyfathersday.png","dad_foreground.png","dad2.jpg","momanddad.png")
