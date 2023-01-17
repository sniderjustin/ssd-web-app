import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import './App.css';




function ImgTest() {

    const [model, setModel] = useState();

    async function loadModel() {
        try {
            const model = await cocoSsd.load();
            setModel(model);
            console.log("setloadedModel");
            console.log(model);
          } catch (err) {
            console.log(err);
            console.log("failed load model");
          }
    
    };


  useEffect(() => {
    tf.ready().then(() => {
        loadModel();
      });
  }, []);

 async function predictFunction() {
    const images = document.getElementById("myimage");
    console.log(images)
    const predictions = await model.detect(images);
    console.log('predictions');
    console.log(predictions);
 }

  return (
    <div className='classifyOnClick'>
    <img id='myimage'
        crossOrigin='anonymous'
        src='https://cdn.glitch.com/5bf7c54b-c36f-4009-a191-186909fb788e%2Fdog_flickr_publicdomain.jpg?v=1579209396930' 
        width={400}
    />
    <button onClick={predictFunction}>
    Start Detect
    </button>
  </div>
  );
}

export default ImgTest;