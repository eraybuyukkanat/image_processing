import numpy as np
from PIL import Image
import io

async def crop_image(image_data,x,y,a,b):

    image = Image.open(io.BytesIO(image_data))
    m = np.array(image)
    print(x)

    w, h = m.shape[:2]
    xNew = int(w * 1 / x)
    yNew = int(h * 1 / y)

    if m.shape[2] == 3:
        m = np.concatenate((m, 255 * np.ones((w, h, 1), dtype=np.uint8)), axis=2)

    newImage = np.zeros([xNew, yNew, 4], dtype=np.uint8)

    for i in range(xNew):
        for j in range(yNew):
            newImage[i, j] = m[a + i, b + j]

    cropped_image = Image.fromarray(newImage, 'RGBA')
    img_byte_arr = io.BytesIO()
    cropped_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr



