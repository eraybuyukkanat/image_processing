import {
  Button,
  Card,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { adaptifEsiklemeRequest, binaryRequest, blurringRequest, brightnessRequest, cropImageRequest, gaussRequest, grayScaleRequest, gurultuEklemeRequest, gurultuTemizlemeRequest, rotateRequest, sobelRequest, zoomInRequest} from "./requests/requests";

function App() {
  const [output, setOutput] = useState();

  const [data, setData] = useState({
    cropX: 2,
    cropY: 2,
    cropA: 200,
    cropB: 200,
    rotateValue: 90,
    brightnessFactor: 1.5,
    zoomInValue: 2,
    zoomInCenterX: 450,
    zoomInCenterY: 450,
    blur_kernel_size: 10,
    gauss_kernel_size: 10,
    gauss_sigma: 5,
    adaptifBlockSize: 15,
    adaptifCValue: 10,
    saltValue: 0.1,
    pepperValue: 0.1,
    gurultuFilterSize: 3,
    gurultuFilterType: "mean"
  });

  const handleChange = (event) => {
    setData({ ...data, "gurultuFilterType": event.target.value });
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });


  async function grayScale() {
    console.log(data.cropA);
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    const imageUrl = await grayScaleRequest(formData);
    if (imageUrl) {
      setOutput(imageUrl);
    }
  }
  async function gurultuTemizleme() {
    console.log(data.gurultuFilterSize)
    console.log(data.gurultuFilterType)

    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("x", data.gurultuFilterType); 
    formData.append("y", data.gurultuFilterSize); 

    const imageUrl = await gurultuTemizlemeRequest(formData);
    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  async function binaryDonusum() {
    console.log(data.cropA);
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    const imageUrl = await binaryRequest(formData);

    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  async function blurring() {
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("x", data.blur_kernel_size); 
    const imageUrl = await blurringRequest(formData);

    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  async function gauss() {
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("x", data.gauss_kernel_size);
    formData.append("y", data.gauss_sigma); 

    const imageUrl = await gaussRequest(formData);

    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  async function adaptifEsikleme() {
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("x", data.adaptifBlockSize);
    formData.append("y", data.adaptifCValue); 

    const imageUrl = await adaptifEsiklemeRequest(formData);

    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  async function rotate() {
    console.log(data.cropA);
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("x", data.rotateValue); 
    const imageUrl = await rotateRequest(formData);
    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  async function saltPepper() {
    console.log(data.cropA);
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("x", data.saltValue); 
    formData.append("y", data.pepperValue); 

    const imageUrl = await gurultuEklemeRequest(formData);
    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  async function brightness() {
    console.log(data.cropA);
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("x", data.brightnessFactor); 

    const imageUrl = await brightnessRequest(formData);
    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  async function sobel() {
    console.log(data.cropA);
    var formData = new FormData();
    formData.append("file", plainFiles[0]);

    const imageUrl = await sobelRequest(formData);
    if (imageUrl) {
      setOutput(imageUrl);
    }
  }
  async function zoomIn() {
    console.log(data.cropA);
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("zoom_factor", data.zoomInValue);
    formData.append("center_x", data.zoomInCenterX);
    formData.append("center_y", data.zoomInCenterY); 

    const imageUrl = await zoomInRequest(formData);
    if (imageUrl) {
      setOutput(imageUrl);
    }
  }
 
  async function crop() {
    console.log(data.cropA);
    var formData = new FormData();
    formData.append("file", plainFiles[0]);
    formData.append("x", data.cropX); 
    formData.append("y", data.cropY); 
    formData.append("a", data.cropA);
    formData.append("b", data.cropB);

    const imageUrl = await cropImageRequest(formData);
    
    if (imageUrl) {
      setOutput(imageUrl);
    }
  }

  function temizle() {
    clear();
    setOutput(null);
    setData({cropA: "",cropB:"",cropX:"",cropY:""})
  }

  return (
    <>
      <Grid display="flex" flexDirection="column" alignItems="center">
        <Typography fontSize={28} textAlign="center">
          Image Processing
        </Typography>
        <Button
          sx={{ maxWidth: 250}}
          variant="contained"
          onClick={temizle}
          color="error"
        >
          Clear
        </Button>
        {filesContent == 0 ? null : 
        <Button
          sx={{ maxWidth: 250, marginY: 1  }}
          variant="contained"
          onClick={openFilePicker}
          color="error"
        >
          Upload Image
        </Button>
        }
      </Grid>
      <Grid>
        <Grid
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
          display="flex"
        >
          {filesContent != 0 ? (
            <Card elevation={5}>
              <CardMedia
                component="img"
                height="300"
                image={filesContent[0].content}
                alt={"alt"}
                title={"Fotoğraf"}
                sx={{ objectFit: "" }}
              />
            </Card>
          ) : (
            <Button
              sx={{ maxHeight: 40 }}
              variant="contained"
              color="error"
              component="label"
              onClick={openFilePicker}
            >
              Upload Image
            </Button>
          )}

          {output ? (
            <Card elevation={5}>
              <CardMedia
                component="img"
                height="300"
                image={output}
                alt={"alt"}
                title={"Fotoğraf"}
                sx={{ objectFit: "" }}
              />
            </Card>
          ) : (
            <Card
              elevation={5}
              sx={{
                width: 300,
                height: 300,
              }}
            ></Card>
          )}
        </Grid>

        <Grid
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingX={5}
          paddingY={3}
        >
          <Grid display="flex" flexDirection="column" >
            <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={crop} color="error">
              Cropping
            </Button>
            <TextField
              sx={{ marginY: 1 }}
              id="cropX"
              name="cropX"
              helperText="Genişlik = (Fotoğraf Boyutu / Girilecek Değer)"
              value={data.cropX}
              variant="outlined"
              onChange={changeHandler}
            />
            <TextField
              sx={{ marginY: 1 }}
              id="cropY"
              name="cropY"
              helperText="Yükseklik = (Fotoğraf Boyutu / Girilecek Değer)"
              value={data.cropY}
              variant="outlined"
              onChange={changeHandler}
            />
            <TextField
              sx={{ marginY: 1 }}
              id="cropB"
              name="cropB"
              helperText="X Ekseninde Başlangıç Yeri"
              value={data.cropB}
              variant="outlined"
              onChange={changeHandler}
            />
            <TextField
              sx={{ marginY: 1 }}
              id="cropA"
              name="cropA"
              helperText="Y Ekseninde Başlangıç Yeri"
              value={data.cropA}
              variant="outlined"
              onChange={changeHandler}
            />
            
          </Grid>
          <Grid display="flex" flexDirection="column">
          <Button sx={{marginY:1}} disabled={filesContent != 0 ? false : true} variant="contained" onClick={grayScale} color="error">
            Gray Conversion
          </Button>
          <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={binaryDonusum} color="error">
            Binary Conversion
          </Button>
          <Button sx={{marginY:1}} disabled={filesContent != 0 ? false : true} variant="contained" onClick={sobel} color="error">
            Sobel Edge Detection
          </Button>
          <Grid display="flex" flexDirection="column"> 
          <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={saltPepper} color="error">
            Salt and Pepper Noise
          </Button>
          <TextField
              sx={{ marginY: 1 }}
              id="saltValue"
              name="saltValue"
              value={data.saltValue}
              helperText="Salt Değeri"
              variant="outlined"
              onChange={changeHandler}
            />
            <TextField
              sx={{ marginY: 1 }}
              id="pepperValue"
              name="pepperValue"
              value={data.pepperValue}
              helperText="Pepper Değeri"
              variant="outlined"
              onChange={changeHandler}
            />
          </Grid>
          </Grid>
          <Grid display="flex" flexDirection="column">
          <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={rotate} color="error">
            Rotating
          </Button>
          <TextField
              sx={{ marginY: 1 }}
              id="rotateValue"
              name="rotateValue"
              helperText="Döndürme Açısı"
              value={data.rotateValue}
              variant="outlined"
              onChange={changeHandler}
            />
            <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={brightness} color="error">
            Brightness 
          </Button>
          <TextField
              sx={{ marginY: 1 }}
              id="brightnessFactor"
              name="brightnessFactor"
              helperText="Parlaklık Değeri"
              value={data.brightnessFactor}
              variant="outlined"
              onChange={changeHandler}
            />
            
          
          </Grid>
         
          <Grid display="flex" flexDirection="column">
          <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={zoomIn} color="error">
              Zoom
          </Button>
          <TextField
              sx={{ marginY: 1 }}
              id="zoomInValue"
              name="zoomInValue"
              value={data.zoomInValue}
              helperText="Yakınlaştırma Katsayısı"
              variant="outlined"
              onChange={changeHandler}
            />
            <TextField
              sx={{ marginY: 1 }}
              id="zoomInCenterX"
              name="zoomInCenterX"
              value={data.zoomInCenterX}
              helperText="Merkezinin X Ekseninde Başlangıç Yeri"
              variant="outlined"
              onChange={changeHandler}
            />
            <TextField
              sx={{ marginY: 1 }}
              id="zoomInCenterY"
              name="zoomInCenterY"
              value={data.zoomInCenterY}
              helperText="Merkezinin Y Ekseninde Başlangıç Yeri"
              variant="outlined"
              onChange={changeHandler}
            />
          </Grid>
          <Grid display="flex" flexDirection="column">
          <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={blurring} color="error">
              Blurring
          </Button>
          <TextField
              sx={{ marginY: 1 }}
              id="blur_kernel_size"
              name="blur_kernel_size"
              value={data.blur_kernel_size}
              helperText="Bulanıklaştırma Değeri"
              variant="outlined"
              onChange={changeHandler}
            />
          <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={gauss} color="error">
            Gaussian Transformation
          </Button>
          <TextField
              sx={{ marginY: 1 }}
              id="gauss_kernel_size"
              name="gauss_kernel_size"
              value={data.gauss_kernel_size}
              helperText="Gauss Değeri"
              variant="outlined"
              onChange={changeHandler}
            />
            <TextField
              sx={{ marginY: 1 }}
              id="gauss_sigma"
              name="gauss_sigma"
              value={data.gauss_sigma}
              helperText="Sigma Değeri"
              variant="outlined"
              onChange={changeHandler}
            />
          </Grid>
          <Grid display="flex" flexDirection="column">
          <Button disabled={filesContent != 0 ? false : true} variant="contained" onClick={adaptifEsikleme} color="error">
            Adaptive Thresholding
          </Button>
          <TextField
              sx={{ marginY: 1 }}
              id="adaptifBlockSize"
              name="adaptifBlockSize"
              value={data.adaptifBlockSize}
              helperText="Blok Değeri"
              variant="outlined"
              onChange={changeHandler}
            />
            <TextField
              sx={{ marginY: 1 }}
              id="adaptifCValue"
              name="adaptifCValue"
              value={data.adaptifCValue}
              helperText="C Değeri"
              variant="outlined"
              onChange={changeHandler}
            />
          </Grid>
          <Grid display="flex" flexDirection="column">
          <Button sx={{marginY: 1}} disabled={filesContent != 0 ? false : true} variant="contained" onClick={gurultuTemizleme} color="error">
            Noise Reduction (Mean&Median)
          </Button>
          <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.gurultuFilterType}
          onChange={handleChange}
        >
          <MenuItem value="mean">Mean</MenuItem>
          <MenuItem value="median">Median</MenuItem>
        </Select>
      </FormControl>
            <TextField
              sx={{ marginY: 1 }}
              id="gurultuFilterSize"
              name="gurultuFilterSize"
              value={data.gurultuFilterSize}
              helperText="Filtre Boyutu"
              variant="outlined"
              onChange={changeHandler}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
