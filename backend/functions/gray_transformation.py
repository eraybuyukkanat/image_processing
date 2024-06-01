from PIL import Image
import numpy as np
import io

async def convert_to_grayscale(image_data):
    image = Image.open(io.BytesIO(image_data))
    m = np.array(image)


    if m.shape[2] == 3:
        gray = 0.299 * m[:, :, 0] + 0.587 * m[:, :, 1] + 0.114 * m[:, :, 2]
    elif m.shape[2] == 4:
        gray = 0.299 * m[:, :, 0] + 0.587 * m[:, :, 1] + 0.114 * m[:, :, 2]
    else:
        raise ValueError("Görüntü uygun formatta değil, RGB veya RGBA formatında olmalı.")

    gray = gray.astype(np.uint8)

    grayscale_image = Image.fromarray(gray, 'L')
    img_byte_arr = io.BytesIO()
    grayscale_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    return img_byte_arr


