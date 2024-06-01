import numpy as np
from PIL import Image
import io


def adaptive_threshold(image_array, block_size, C):
    height, width = image_array.shape
    new_image = np.zeros((height, width), dtype=np.uint8)

    pad_size = block_size // 2
    padded_image = np.pad(image_array, pad_size, mode='constant', constant_values=255)

    for i in range(height):
        for j in range(width):
            x, y = i + pad_size, j + pad_size
            block = padded_image[x - pad_size:x + pad_size + 1, y - pad_size:y + pad_size + 1]

            local_thresh = np.mean(block) - C

            new_image[i, j] = 255 if image_array[i, j] > local_thresh else 0

    return new_image


async def adaptive_threshold_image(image_data, block_size, C):
    image = Image.open(io.BytesIO(image_data)).convert('L')
    m = np.array(image)
    thresholded_image_array = adaptive_threshold(m, block_size, C)
    thresholded_image = Image.fromarray(thresholded_image_array)
    img_byte_arr = io.BytesIO()
    thresholded_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr