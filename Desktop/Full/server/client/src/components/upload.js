import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {
  state = {
    imgFile: null
  };
  
  // On file select (from the pop up)
  onFileChange = event => {  
    // Update the state
    this.setState({ imgFile: event.target.files[0] });
  };
  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append(
      "imgFile",
      this.state.imgFile
    );
    // Details of the uploaded file
    console.log(this.state.imgFile);
    // Request made to the backend api
    // Send formData object
    axios.post("http://localhost:3001/imgUpload", formData);
    alert('Image upload successfully')
  };
  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.imgFile) {
      return (
        <div>
          <br/>
          <h2 style={{color:'wheat'}}>File Details:</h2>
          <p style={{color:'whitesmoke'}}>File Name: {this.state.imgFile.name}</p>           
          <p style={{color:'whitesmoke'}}>File Type: {this.state.imgFile.type}</p>
          <p style={{color:'whitesmoke'}}>
            Last Modified:{" "}
            {this.state.imgFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  
  render() {
  
    return (
      <div>
          <h4 style={{color:'white'}}>
            Upload Image
          </h4>
          <br/>
          <div>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>
                Upload!
              </button>
          </div>
        {this.fileData()}
      </div>
    );
  }
}

export default Upload;