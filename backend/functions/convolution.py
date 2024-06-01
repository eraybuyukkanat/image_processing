import numpy as np
from PIL import Image
import io


def gaussian_kernel(size, sigma=1):
    x, y = np.mgrid[-size // 2 + 1:size // 2 + 1, -size // 2 + 1:size // 2 + 1]
    g = np.exp(-((x * 2 + y) / (2.0 * sigma * 2)))
    return g / g.sum()


def apply_convolution(image_data, kernel):
    image = Image.open(io.BytesIO(image_data)).convert('RGB')
    m = np.array(image)
    height, width, channels = m.shape

    k_height, k_width = kernel.shape

    new_image = np.zeros((height, width, channels), dtype=np.float32)

    padded_image = np.pad(m, (
        (k_height // 2, k_height // 2),
        (k_width // 2, k_width // 2),
        (0, 0)
    ), mode='constant')

    for y in range(height):
        for x in range(width):
            for c in range(channels):
                new_image[y, x, c] = np.sum(kernel * padded_image[y:y + k_height, x:x + k_width, c])

    new_image = np.clip(new_image, 0, 255).astype(np.uint8)

    result_image = Image.fromarray(new_image)
    img_byte_arr = io.BytesIO()
    result_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr


