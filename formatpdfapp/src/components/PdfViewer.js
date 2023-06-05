import React, { useState } from 'react';
import axios from 'axios';

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          style={{ flex: 1, border: 'none' }}
        />
      )}
    </div>
  );
};

export default PdfViewer;
