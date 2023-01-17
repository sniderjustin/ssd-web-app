import { useState, useEffect } from 'react';
import './App.css';

function ImgForm() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

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
            src={imageSrc}
            key={imageSrc}
          />
        ))}
      </div>
    </div>
  );
}

export default ImgForm;
