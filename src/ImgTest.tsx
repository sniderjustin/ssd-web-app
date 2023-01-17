import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import './App.css';


async function onFirstLoad() {
    try {
        const model = await cocoSsd.load();
        // setModel(model);
        console.log("setloadedModel");
        console.log(model);
      } catch (err) {
        console.log(err);
        console.log("failed load model");
      }

};

function ImgTest() {
  useEffect(() => {
    tf.ready().then(() => {
        onFirstLoad();
      });
  }, []);

  return (
    <div className='classifyOnClick'>
    <img src='https://cdn.glitch.com/5bf7c54b-c36f-4009-a191-186909fb788e%2Fdog_flickr_publicdomain.jpg?v=1579209396930' 
      width={400}
    />
  </div>
  );
}

export default ImgTest;