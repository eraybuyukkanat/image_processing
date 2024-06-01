from PIL import Image
import io
import numpy as np

async def zoom_in(image_data, zoom_factor, center_x, center_y):
    image = Image.open(io.BytesIO(image_data))
    m = np.array(image)

    w, h = m.shape[:2]
    new_w = int(w / zoom_factor)
    new_h = int(h / zoom_factor)

    left = max(center_x - new_w // 2, 0)
    top = max(center_y - new_h // 2, 0)
    right = min(center_x + new_w // 2, w)
    bottom = min(center_y + new_h // 2, h)

    newImage = m[top:bottom, left:right]

    resized_image = Image.fromarray(newImage)
    img_byte_arr = io.BytesIO()
    resized_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr

