import numpy as np
import imageio.v3 as iio
from PIL import Image
import io

async def increase_brightness(image_data, brightness_factor):
    image = Image.open(io.BytesIO(image_data))
    img_array = np.array(image)
    img_array = img_array * brightness_factor
    img_array = np.clip(img_array, 0, 255)
    brightened_image = Image.fromarray(img_array.astype('uint8'))
    img_byte_arr = io.BytesIO()
    brightened_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    return img_byte_arr