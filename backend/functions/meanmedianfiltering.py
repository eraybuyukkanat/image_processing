import numpy as np
from PIL import Image
import io

def apply_mean_filter(image_array, filter_size=3):
    height, width = image_array.shape
    filtered_image = np.zeros((height, width), dtype=np.uint8)

    pad_size = filter_size // 2
    padded_image = np.pad(image_array, pad_size, mode='edge')

    for i in range(height):
        for j in range(width):
            block = padded_image[i:i+filter_size, j:j+filter_size]
            filtered_image[i, j] = int(np.mean(block))

    return filtered_image

def apply_median_filter(image_array, filter_size=3):
    height, width = image_array.shape
    filtered_image = np.zeros((height, width), dtype=np.uint8)

    pad_size = filter_size // 2
    padded_image = np.pad(image_array, pad_size, mode='edge')

    for i in range(height):
        for j in range(width):
            block = padded_image[i:i+filter_size, j:j+filter_size]
            filtered_image[i, j] = int(np.median(block))

    return filtered_image

async def remove_salt_and_pepper_noise(image_data, filter_type, filter_size):
    image = Image.open(io.BytesIO(image_data)).convert('L')
    m = np.array(image)

    if filter_type == 'mean':
        filtered_image_array = apply_mean_filter(m, filter_size)
    elif filter_type == 'median':
        filtered_image_array = apply_median_filter(m, filter_size)
    else:
        raise ValueError("Invalid filter type. Use 'mean' or 'median'.")

    filtered_image = Image.fromarray(filtered_image_array)
    img_byte_arr = io.BytesIO()
    filtered_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr