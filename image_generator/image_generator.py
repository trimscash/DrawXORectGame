from PIL import Image, ImageDraw, ImageOps
import math
import os
import datetime
import random


# 画像のサイズと背景色を指定
WIDTH, HEIGH = 300, 300
BACKGROUND_COLOR = (255, 255, 255)  # 白色

IMAGE_NUM = 400

# NEW_FOLDER_NAME = datetime.datetime.now().strftime("./%Y-%m-%d-%H-%M-%S-%f")
NEW_FOLDER_NAME = "images"

os.makedirs(NEW_FOLDER_NAME, exist_ok=True)

X_IMAGE_PATH = NEW_FOLDER_NAME+"/X_IMAGES"
CIRCLE_IMAGE_PATH = NEW_FOLDER_NAME+"/CIRCLE_IMAGES"
RECT_IMAGE_PATH = NEW_FOLDER_NAME+"/RECT_IMAGES"

os.makedirs(X_IMAGE_PATH, exist_ok=True)
os.makedirs(CIRCLE_IMAGE_PATH, exist_ok=True)
os.makedirs(RECT_IMAGE_PATH, exist_ok=True)

# X
for i in range(IMAGE_NUM):
    # 画像の作成
    image = Image.new("RGB", (WIDTH, HEIGH), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(image)

    # バリエーション
    rand_thick = random.randint(0, 30)
    rand_x = random.randint(WIDTH//2-20, WIDTH//2-20)
    rand_y = random.randint(0, HEIGH//2)
    rand_h = random.randint(HEIGH//2, HEIGH-rand_y+20)

    # 垂直線
    draw.line([(rand_x, rand_y), (rand_x, rand_y + rand_h)],
              fill=(0, 0, 0), width=rand_thick)

    old_x = rand_x
    old_y = rand_y

    # バリエーション
    rand_thick = random.randint(0, 30)
    rand_x = random.randint(rand_x+1, WIDTH)
    rand_y = random.randint(0, HEIGH)
    length = random.randint(WIDTH-rand_x, WIDTH)
    angle1 = math.atan((rand_y-old_y) / (rand_x-old_x))
    angle2 = math.atan((rand_y-old_y-rand_h) / (rand_x-old_x))
    angle = random.uniform(angle1, angle2)

    # 右上から左下に向かう線
    draw.line([(rand_x, rand_y), (rand_x-length*math.cos(angle), rand_y-length*math.sin(angle))],
              fill=(0, 0, 0), width=rand_thick)

    rand_angle = random.randint(0, 90)

    # 画像を回転させる
    rotated_image = ImageOps.exif_transpose(
        image.rotate(rand_angle, fillcolor=BACKGROUND_COLOR))

    # 回転後の画像を保存
    rotated_image.save(
        f"./{X_IMAGE_PATH}/{i}.png")

# Circle
for i in range(IMAGE_NUM):
    # 画像の作成
    image = Image.new("RGB", (WIDTH, HEIGH), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(image)

    # バリエーション
    rand_thick = random.randint(0, 30)
    rand_x = random.randint(0, WIDTH//2)
    rand_y = random.randint(0, HEIGH//2)
    rand_w = random.randint(rand_thick*2, WIDTH-rand_x-rand_thick)
    rand_h = random.randint(rand_thick*2, HEIGH-rand_y-rand_thick)

    # 円の描画
    draw.ellipse([rand_x, rand_y, rand_x+rand_w, rand_y+rand_h],
                 outline=(0, 0, 0), width=rand_thick)    # 回転後の画像を保存
    image.save(
        f"./{CIRCLE_IMAGE_PATH}/{i}.png")

# Rect
for i in range(IMAGE_NUM):
    # 画像の作成
    image = Image.new("RGB", (WIDTH, HEIGH), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(image)

    # バリエーション
    rand_thick = random.randint(0, 30)
    rand_x = random.randint(0, WIDTH//2)
    rand_y = random.randint(0, HEIGH//2)
    rand_w = random.randint(rand_thick*2, WIDTH-rand_x-rand_thick)
    rand_h = random.randint(rand_thick*2, HEIGH-rand_y-rand_thick)

    # 四角形
    draw.rectangle([rand_x, rand_y, rand_x+rand_w, rand_y+rand_h],
                   outline=(0, 0, 0), width=rand_thick)

    rand_angle = random.randint(0, 90)

    # 画像を回転させる
    rotated_image = ImageOps.exif_transpose(
        image.rotate(rand_angle, fillcolor=BACKGROUND_COLOR))

    # 回転後の画像を保存
    rotated_image.save(
        f"./{RECT_IMAGE_PATH}/{i}.png")
