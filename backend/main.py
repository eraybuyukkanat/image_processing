import traceback
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI,UploadFile, File,Form
import uvicorn
from fastapi.responses import StreamingResponse

from backend.functions.binary_transformation import convert_to_binary
from backend.functions.blurring import blur_image
from backend.functions.brightness import increase_brightness
from backend.functions.rotating import rotate_image
from backend.functions.gauss import gaussian_blur_image
from backend.functions.gray_transformation import convert_to_grayscale
from backend.functions.saltandpepper import add_salt_and_pepper_noise_image
from backend.functions.meanmedianfiltering import remove_salt_and_pepper_noise
from backend.functions.cropping import crop_image
from backend.functions.sobel import sobel_edge_detection
from backend.functions.adaptive_thresholding import adaptive_threshold_image
from backend.functions.zoom import zoom_in

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/cropImage/")
async def cropImageEndpoint(file: UploadFile = File(...),  x: int = Form(...),
    y: int = Form(...),
    a: int = Form(...),
    b: int = Form(...)):
    try:
        contents = await file.read()
        image = await crop_image(contents,x,y,a,b)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/grayScale/")
async def grayScale(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = await convert_to_grayscale(contents)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/binaryDonusum/")
async def binary(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = await convert_to_binary(contents)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/rotate/")
async def rotate(file: UploadFile = File(...),x: int = Form(...)):
    try:
        contents = await file.read()
        image = await rotate_image(contents,x)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/brightness/")
async def brightness(file: UploadFile = File(...),x: float = Form(...)):
    try:
        contents = await file.read()
        image = await increase_brightness(contents,x)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/sobel/")
async def sobel(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = await sobel_edge_detection(contents)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/zoomIn/")
async def zoomIn(file: UploadFile = File(...),zoom_factor: float = Form(...),center_x: int = Form(...),center_y: int = Form(...)):
    try:
        contents = await file.read()
        image = await zoom_in(contents,zoom_factor,center_x,center_y)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/blurring/")
async def blurring(file: UploadFile = File(...),x: int = Form(...)):
    try:
        contents = await file.read()
        image = await blur_image(contents,x)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()


@app.post("/gauss/")
async def blurring(file: UploadFile = File(...),x: int = Form(...),y: int = Form(...)):
    try:
        contents = await file.read()
        image = await gaussian_blur_image(contents,x,y)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/adaptifesikleme/")
async def adaptifEsikleme(file: UploadFile = File(...),x: int = Form(...),y: int = Form(...)):
    try:
        contents = await file.read()
        image = await adaptive_threshold_image(contents,x,y)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/gurultuekleme/")
async def gurultuEkleme(file: UploadFile = File(...),x: float = Form(...),y: float = Form(...)):
    try:
        contents = await file.read()
        image = await add_salt_and_pepper_noise_image(contents,x,y)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

@app.post("/gurultuTemizleme/")
async def gurultuTemizleme(file: UploadFile = File(...),x: str = Form(...),y: int = Form(...)):
    try:
        contents = await file.read()
        image = await remove_salt_and_pepper_noise(contents,x,y)
        return StreamingResponse(image, media_type="image/png")
    except Exception as e:
        traceback.print_exc()

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8001)