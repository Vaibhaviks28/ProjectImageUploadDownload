import React ,{useState}from 'react'
import axios from 'axios';
export default function AddImage() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = async () => {
      if (!file) {
        setMessage("Please select a file first.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await axios.post("http://localhost:8082/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        setMessage(response.data);
      } catch (error) {
        setMessage("Upload failed. Try again.");
      }
    };
  
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Image Upload</h2>
        <input type="file" onChange={handleFileChange} />
        <br /><br />
        <button onClick={handleUpload}>Upload</button>
        <p>{message}</p>
      </div>
    );
}
