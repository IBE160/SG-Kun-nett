
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DropzoneArea = styled(Card)(({ theme, isDragActive }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: isDragActive ? 'rgba(76, 175, 80, 0.1)' : theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  textAlign: 'center',
  padding: theme.spacing(4),
  cursor: 'pointer',
  transition: 'border-color 0.3s, background-color 0.3s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFiles = [...e.dataTransfer.files];
    const validFiles = droppedFiles.filter(file =>
      ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type)
    );
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    const validFiles = selectedFiles.filter(file =>
        ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type)
      );
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const onBrowse = () => {
    document.getElementById('file-input').click();
  }

  return (
    <Box>
      <input
        id="file-input"
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".pdf,.docx,.txt"
      />
      <DropzoneArea
        isDragActive={isDragActive}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={onBrowse}
      >
        <CardContent>
          <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Release to upload' : 'Drop your CV or Job Posting here'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or click to browse
          </Typography>
        </CardContent>
      </DropzoneArea>
      <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center' }}>
        Supports PDF, DOCX, TXT
      </Typography>
      {files.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">Uploaded Files:</Typography>
          {files.map(file => (
            <Box key={file.name} display="flex" alignItems="center" mt={1}>
              <Typography>{file.name} ({Math.round(file.size / 1024)} KB)</Typography>
              <Button size="small" onClick={() => removeFile(file.name)} sx={{ ml: 2 }}>
                Remove
              </Button>
            </Box>
          ))}
          {files.length === 2 && (
             <Typography variant="subtitle1" color="primary" sx={{mt: 1}}>Ready for analysis</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
