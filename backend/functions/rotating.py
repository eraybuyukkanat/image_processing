from PIL import Image
import numpy as np
import io
from scipy.ndimage import rotate as scipy_rotate

async def rotate_image(image_data, angle=90):
    image = Image.open(io.BytesIO(image_data))
    m = np.array(image)

    rotated = scipy_rotate(m, angle, reshape=False, mode='nearest', order=3)

    rotated_image = Image.fromarray(rotated)
    img_byte_arr = io.BytesIO()
    rotated_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    return img_byte_arr