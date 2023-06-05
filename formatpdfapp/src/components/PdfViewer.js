import React, { useState } from 'react';
import axios from 'axios';

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('pdf', file);

    axios.post('http://localhost:5050/upload', formData)
      .then(() => {
        setUploadStatus('Upload successful');
        getPdfUrl(); // Retrieve the PDF URL after successful upload
      })
      .catch((error) => {
        console.log(error);
        setUploadStatus('Upload failed');
      });
  };

  const getPdfUrl = () => {
    axios.get('http://localhost:5050/pdf-url')
      .then((response) => {
        setPdfUrl(response.data.url);
      })
      .catch((error) => {
        console.log(error);
        setPdfUrl('');
      });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
      {uploadStatus && <p>{uploadStatus}</p>}
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          style={{ flex: 1, border: 'none' }}
        />
      ) : (
        <p>No PDF to display</p>
      )}
    </div>
  );
};

export default PdfViewer;
