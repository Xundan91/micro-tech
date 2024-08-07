import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await axios.get('/api/images');
      setUploadedImages(data);
    };

    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('image', image);

    try {
      await axios.post('/api/images', formData);
      setName('');
      setDesc('');
      setImage(null);
      const { data } = await axios.get('/api/images');
      setUploadedImages(data);
    } catch (error) {
      console.error('Failed to upload image', error);
    }
  };

  return (
    <div>
      <h1>To Upload Image on MongoDB</h1>
      <hr />
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="name">Image Title</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="desc">Image Description</label>
            <textarea
              id="desc"
              name="desc"
              value={desc}
              rows="2"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <hr />

      <h1>Uploaded Images</h1>
      <div>
        {uploadedImages.map((image) => (
          <div key={image._id}>
            <div>
              <img
                src={`data:image/${image.img.contentType};base64,${btoa(
                  new Uint8Array(image.img.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                  )
                )}`}
                alt={image.name}
              />
              <div>
                <h5>{image.name}</h5>
                <p>{image.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
