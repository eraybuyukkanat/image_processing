import numpy as np
from PIL import Image
import io
import random

def add_salt_and_pepper_noise(image_array, salt_ratio, pepper_ratio):
    height, width = image_array.shape
    noisy_image = np.copy(image_array)

    salt_pixels = int(height * width * salt_ratio)
    pepper_pixels = int(height * width * pepper_ratio)

    for _ in range(salt_pixels):
        x = random.randint(0, height - 1)
        y = random.randint(0, width - 1)
        noisy_image[x, y] = 255


    for _ in range(pepper_pixels):
        x = random.randint(0, height - 1)
        y = random.randint(0, width - 1)
        noisy_image[x, y] = 0

    return noisy_image

async def add_salt_and_pepper_noise_image(image_data, salt_ratio, pepper_ratio):
    image = Image.open(io.BytesIO(image_data)).convert('L')
    m = np.array(image)

    noisy_image_array = add_salt_and_pepper_noise(m, salt_ratio, pepper_ratio)

    noisy_image = Image.fromarray(noisy_image_array)
    img_byte_arr = io.BytesIO()
    noisy_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr