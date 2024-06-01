import numpy as np
from PIL import Image
import io


async def sobel_edge_detection(image_data):
    image = Image.open(io.BytesIO(image_data))
    image = image.convert('L')
    m = np.array(image, dtype=np.float32)

    sobel_x = np.array([[-1, 0, 1],
                        [-2, 0, 2],
                        [-1, 0, 1]])

    sobel_y = np.array([[-1, -2, -1],
                        [0, 0, 0],
                        [1, 2, 1]])

    w, h = m.shape
    edge_magnitude = np.zeros((w, h), dtype=np.float32)

    for i in range(1, w - 1):
        for j in range(1, h - 1):
            gx = np.sum(sobel_x * m[i - 1:i + 2, j - 1:j + 2])
            gy = np.sum(sobel_y * m[i - 1:i + 2, j - 1:j + 2])
            gx_squared = gx * gx
            gy_squared = gy * gy
            edge_magnitude[i, j] = np.sqrt(gx_squared + gy_squared)

    edge_magnitude = (edge_magnitude / edge_magnitude.max()) * 255.0
    edge_magnitude = edge_magnitude.astype(np.uint8)

    edge_image = Image.fromarray(edge_magnitude)

    img_byte_arr = io.BytesIO()
    edge_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    return img_byte_arr


