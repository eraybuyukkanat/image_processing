import numpy as np
from PIL import Image
import io


def gaussian_kernel(size, sigma=1):
    ax = np.linspace(-(size - 1) / 2., (size - 1) / 2., size)
    gauss = np.exp(-0.5 * np.square(ax) / np.square(sigma))
    kernel = np.outer(gauss, gauss)
    return kernel / np.sum(kernel)


async def gaussian_blur_image(image_data, kernel_size, sigma):
    if not isinstance(kernel_size, int):
        raise ValueError("Kernel size must be an integer")

    image = Image.open(io.BytesIO(image_data))
    m = np.array(image)

    def apply_kernel(matrix, kernel):
        kernel_height, kernel_width = kernel.shape
        height, width = matrix.shape[:2]
        new_matrix = np.zeros_like(matrix)

        pad_height = kernel_height // 2
        pad_width = kernel_width // 2

        padded_matrix = np.pad(matrix, ((pad_height, pad_height), (pad_width, pad_width), (0, 0)), mode='constant')

        for i in range(height):
            for j in range(width):
                for k in range(matrix.shape[2]):
                    new_matrix[i, j, k] = np.sum(padded_matrix[i:i + kernel_height, j:j + kernel_width, k] * kernel)

        return new_matrix

    kernel = gaussian_kernel(kernel_size, sigma)
    blurred_image_array = apply_kernel(m, kernel)

    blurred_image = Image.fromarray(blurred_image_array.astype(np.uint8))
    img_byte_arr = io.BytesIO()
    blurred_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr