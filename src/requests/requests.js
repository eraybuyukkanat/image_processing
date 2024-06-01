import axios from "axios";


export async function cropImageRequest(formData){
    try {
        const response = await axios.post("http://127.0.0.1:8001/cropImage/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
        console.log(imageUrl)
        return imageUrl;
      } catch (e) {
        console.error("Error during image processing: ", e);
        return null;
      }
}


export async function grayScaleRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/grayScale/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function binaryRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/binaryDonusum/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function rotateRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/rotate/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function brightnessRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/brightness/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function sobelRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/sobel/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function zoomInRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/zoomIn/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function zoomOutRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/zoomOut/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}


export async function blurringRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/blurring/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function gaussRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/gauss/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function adaptifEsiklemeRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/adaptifesikleme/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function gurultuEklemeRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/gurultuekleme/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}

export async function gurultuTemizlemeRequest(formData){
  try {
      const response = await axios.post("http://127.0.0.1:8001/gurultuTemizleme/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);  // Blob'dan bir URL oluşturur.
      console.log(imageUrl)
      return imageUrl;
    } catch (e) {
      console.error("Error during image processing: ", e);
      return null;
    }
}