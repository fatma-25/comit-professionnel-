import React, { Component } from "react";
import { AnchorButton } from "@blueprintjs/core";
import "../style.scss";
import axios from "axios";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFileLoad = (e) => {
    this.setState({
      file: e.currentTarget.files[0],
    });
    console.log(this.state.file);
    const file = e.currentTarget.files[0];
    console.log(file?.name);

    if (file) {
      let fileReader = new FileReader();

      fileReader.onload = () => {};

      fileReader.readAsDataURL(file);
    }
  };
  fileUpload = () => {
    const data = new FormData();
    data.append("file", this.state.file);
    axios.post("http://localhost:2000/upload", data);
    // const { description, title, image, categorie, file } = this.state;
    const fileName = this.state.file.name;
    console.log(fileName, "fileName");
    axios
      .post("http://localhost:2000/addfile", {
        // description,
        // title,
        // image: image.name,
        // categorie,
        filename: fileName,
      })
      .then((res) => console.log(res.data, "res.data"));

    alert("file added with success");
  };

  render() {
    return (
      <div>
        <div className="dragandform">
          <div
            className="inner-container"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="draggable-container">
              <input
                type="file"
                id="file-browser-input"
                name="file-browser-input"
                onChange={this.onFileLoad}
              />
              <div className="files-preview-container"></div>
              <div className="helper-text">
                {this.state.file === null ? (
                  <h3>Drag and Drop Books Here</h3>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <h3>{this.state.file.name}</h3>{" "}
                    <h3>{this.state.file.size} Ko</h3>
                  </div>
                )}
              </div>
              <div className="file-browser-container">
                <AnchorButton
                  text="Upload"
                  onClick={this.fileUpload}
                  style={{
                    marginBottom: 30,
                    backgroundColor: "#00AAEE",
                    color: "grey",
                    fontWeight: "bold",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
