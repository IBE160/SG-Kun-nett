
import React from 'react';
import FileUpload from './index';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
  },
});

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
  decorators: [(Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>],
};

const Template = (args) => <FileUpload {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DragActive = Template.bind({});
DragActive.args = {};
DragActive.play = async ({ canvasElement }) => {
    const dropzone = canvasElement.querySelector('[class*=DropzoneArea]');
    const event = new Event('dragenter', { bubbles: true });
    Object.defineProperty(event, 'dataTransfer', {
        value: {
            files: [],
        },
    });
    dropzone.dispatchEvent(event);
};

export const WithFiles = Template.bind({});
WithFiles.args = {};
WithFiles.play = async ({ canvasElement }) => {
    const component = canvasElement.querySelector('.MuiBox-root');
    const fileInput = component.querySelector('input[type="file"]');
    const files = [
        new File(['cv content'], 'cv.pdf', { type: 'application/pdf' }),
        new File(['job description'], 'job.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
    ];
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;
    const event = new Event('change', { bubbles: true });
    fileInput.dispatchEvent(event);
};
