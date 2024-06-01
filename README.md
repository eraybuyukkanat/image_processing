# Image Processing Project with FastAPI and React

This repository contains the source code for an image processing project, utilizing a FastAPI backend and a React frontend to provide a comprehensive interface for various image processing functions.

## Features

- **FastAPI Backend**: Handles image processing functions and serves as an API for the frontend.
- **React Frontend**: Provides an intuitive and user-friendly interface for users to interact with the image processing functions.
- **Image Processing Functions**:

    1. **Adaptive Thresholding**: Applies adaptive thresholding to the image.
    2. **Binary Conversion**: Converts the image to binary format.
    3. **Blurring**: Applies blurring to the image.
    4. **Brightness Adjustment**: Adjusts the brightness of the image.
    5. **Convolution**: Performs convolution operations on the image.
    6. **Cropping**: Crops the image to a specified region.
    7. **Gaussian Transformation**: Applies Gaussian transformation to the image.
    8. **Noise Reduction**:
        - **Mean Filter**: Applies mean filter for noise reduction.
        - **Median Filter**: Applies median filter for noise reduction.
    9. **Image Rotation**: Rotates the image by a specified angle.
    10. **Salt and Pepper Noise**: Adds salt and pepper noise to the image.
    11. **Sobel Edge Detection**: Detects edges in the image using Sobel algorithm.
    12. **Zoom**: Zooms in or out on the image.

## Installation

### Backend (FastAPI)

1. Clone the repository:
    ```sh
    git clone https://github.com/eraybuyukkanat/image_processing.git
    ```
2. Navigate to the backend directory:
    ```sh
    cd image_processing/backend
    ```
3. Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
4. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```
5. Start the FastAPI server:
    ```sh
    uvicorn main:app --reload
    ```

### Frontend (React)

1. Install the dependencies:
    ```sh
    npm install
    ```
2. Start the React development server:
    ```sh
    npm start
    ```

## Usage

1. Ensure that both the backend and frontend servers are running.
2. Open your web browser and navigate to `http://localhost:3000`.
3. Upload an image and apply various image processing functions through the interface.

## Project Structure

- `backend/`: Contains the FastAPI application and image processing functions.
- `.`: Contains the React application for the user interface.
- `requirements.txt`: Lists the Python dependencies for the FastAPI backend.
- `package.json`: Lists the JavaScript dependencies for the React frontend.

  ![screenshot](https://github.com/eraybuyukkanat/image_processing/assets/89808574/5e978f66-128e-44de-8a6c-4c7570f5aedb)

<sub>## License

This project is licensed under the MIT License - see the <a href="LICENSE.txt">LICENSE</a> file for details.</sub>


