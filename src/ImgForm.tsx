import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import './App.css';
import ImageUploader from './ImageUploader';

const fileTypes = ['JPG', 'PNG', 'GIF'];

function ImgForm() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [model, setModel] = useState();
  const [pred, setPred] = useState([]);
  const [file, setFile] = useState(null);

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
    if (!file) return;

    setImageURLs(file);
  }, []);

  const handleChange = (file) => {
    console.log('file from dragdrop: ', file.name);

    setFile(file);
  };

  function onImageChange(e) {
    // console.log('image uploaded!');
    // setImages([...e.target.files]);
    // call image detection function
  }

  async function predictFunction() {
    const images = document.getElementsByClassName('input-image');
    console.log(images);
    const wrappers = document.getElementsByClassName('image-wrapper');
    Array.from(wrappers).forEach((wrap) => {
      const images = wrap.getElementsByClassName('input-image');
      Array.from(images).forEach((image) => {
        const pred = model.detect(image).then(function (preds) {
          for (let n = 0; n < preds.length; n++) {
            const pred = preds[n];
            console.log('pred:', pred);
            console.log('image:', image);
            const p = document.createElement('p');
            p.innerText = pred.class + ' - with ' + Math.round(parseFloat(pred.score) * 100) + '% confidence.';
            p.style = 'left: ' + pred.bbox[0] + 'px;' + 'top: ' + pred.bbox[1] + 'px; ' + 'width: ' + (pred.bbox[2] - 10) + 'px;';
            const highlight = document.createElement('div');
            highlight.setAttribute('class', 'highlight');
            highlight.style =
              'left: ' + pred.bbox[0] + 'px;' + 'top: ' + pred.bbox[1] + 'px;' + 'width: ' + pred.bbox[2] + 'px;' + 'height: ' + pred.bbox[3] + 'px;';
            wrap.appendChild(highlight);
            wrap.appendChild(p);
            // predictions.push(pred);
          }
        });
      });
    });

    // const imgArr = Array.from(images);
    // const predictions = [];
    // imgArr.forEach((image) => {
    //   const pred = model.detect(image).then(function(preds){
    //     for (let n = 0; n < preds.length; n++) {
    //       const pred = preds[n];
    //       console.log('pred:',pred);
    //       console.log('image:',image)
    //       const p = document.createElement('p');
    //       p.innerText = pred.class  + ' - with '
    //           + Math.round(parseFloat(pred.score) * 100)
    //           + '% confidence.';
    //       p.style = 'left: ' + pred.bbox[0] + 'px;' +
    //         'top: ' + pred.bbox[1] + 'px; ' +
    //         'width: ' + (pred.bbox[2] - 10) + 'px;';
    //       const highlight = document.createElement('div');
    //       highlight.setAttribute('class', 'highlight');
    //       highlight.style = 'left: ' + pred.bbox[0] + 'px;' +
    //           'top: ' + pred.bbox[1] + 'px;' +
    //           'width: ' + pred.bbox[2] + 'px;' +
    //           'height: ' + pred.bbox[3] + 'px;';
    //       image.appendChild(highlight);
    //       image.appendChild(p);
    //       predictions.push(pred);
    //     };
    //   });

    // });
    // console.log('predictions');
    // console.log(predictions);
    // setPred(predictions);
  }

  return (
    <div className='img-form'>
      {!model ? <h3>SSD Loading...</h3> : <></>}
      <ImageUploader />

      {/* <div className='image'> */}
      {/* <input
          type='file'
          accept='image/*'
          onChange={onImageChange}
        ></input> */}
      {/* {file ? (
          <div
            className='image-wrapper'
            key={file}
          >
            <img
              className='input-image'
              crossOrigin='anonymous'
              src={file}
            />
          </div>
        ) : (
          <p>Please upload an image</p>
        )} */}
      {/* </div> */}

      {/* <button
        className='predict-btn'
        onClick={predictFunction}
      >
        Start Detect
      </button> */}
    </div>
  );
}

export default ImgForm;
