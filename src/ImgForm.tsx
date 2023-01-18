import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import './App.css';

function ImgForm() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [model, setModel] = useState();

  // load cocoSad model
  async function loadModel() {
    try {
      const model = await cocoSsd.load();
      setModel(model);
      console.log('setloadedModel');
      console.log(model);
    } catch (err) {
      console.log(err);
      console.log('failed load model');
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => {
      newImageUrls.push(URL.createObjectURL(image));
      setImageURLs(newImageUrls);
    });
  }, [images]);

  function onImageChange(e) {
    console.log('image uploaded!');
    setImages([...e.target.files]);
    // call image detection function
  }

  async function predictFunction() {
    const images = document.getElementsByClassName('input-image');
    console.log(images);
    Array.from(images).forEach(async (image) => {
      const predictions = await model.detect(image);
      console.log('predictions');
      console.log(predictions);
    });
  }

  return (
    <div className='img-form'>
      <h3>Upload Your Image Here</h3>
      <div className='image'>
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={onImageChange}
        ></input>
        {imageURLs.map((imageSrc) => (
          <img
            className='input-image'
            crossOrigin='anonymous'
            src={imageSrc}
            key={imageSrc}
            width={600}
          />
        ))}
      </div>
      <button onClick={predictFunction}>Start Detect</button>
    </div>
  );
}

export default ImgForm;
