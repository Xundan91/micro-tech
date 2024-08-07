import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css'

function App() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('image', file);

    try {
      await axios.post('http://localhost:5000/api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchImages();
      setName('');
      setDesc('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDownload = (image) => {
    const blob = new Blob([new Uint8Array(image.img.data.data)], { type: image.img.contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = image.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <h1>Image Upload and Gallery</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          required 
        />
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          required 
        />
        <button type="submit">Upload</button>
      </form>

      <div className="image-gallery">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <img 
              src={`data:${image.img.contentType};base64,${Buffer.from(image.img.data.data).toString('base64')}`} 
              alt={image.name} 
            />
            <p>{image.name}</p>
            <p>{image.desc}</p>
            <button onClick={() => handleDownload(image)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;