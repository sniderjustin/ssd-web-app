import { useState, useEffect } from 'react';
import './App.css';

function ImgForm() {
  const [image, setImages] = useState([]);

  function onImageChange(e) {
    console.log('image uploaded!');
    setImages([...e.target.files]);
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
      </div>
    </div>
  );
}

export default ImgForm;
