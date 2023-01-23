import React, { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInput = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e) => {
    //prevent the browser from opening the image
    e.preventDefault();
    e.stopPropagation();
    //let's grab the image file
    let imageFile = e.dataTransfer.files[0];
    handleFile(imageFile);
  };

  const handleFile = (file) => {
    //you can carry out any file validations here...
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDetect = () => {
    console.log('handle detect func invoked');
  };
  return (
    <div className='wrapper'>
      {!image ? (
        <div
          className='drop_zone'
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
          onClick={() => fileInput.current.click()}
        >
          {image ? <h3>image loaded!</h3> : <h3>Drag and drop image...</h3>}
          <input
            type='file'
            accept='image/*'
            ref={fileInput}
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <></>
      )}

      {previewUrl && (
        <div className='image'>
          <img
            src={previewUrl}
            alt='image'
            onClick={handleDetect}
          />
          <h3 className='detection-txt'>Click image for detection</h3>
        </div>
      )}
    </div>
  );
};
export default ImageUploader;
