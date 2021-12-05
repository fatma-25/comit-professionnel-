import axios from "axios";
import React, { Component } from "react";

class ReadAndDownold extends Component {
  state = {
    url: "",
  };

  viewHandler = async () => {
    axios({
      url: "http://localhost:2000/pdf",
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      this.setState({
        url: window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        ),
      });
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      window.open(url);
    });
  };

  download = () => {
    const link = document.createElement("a");
    link.href = this.state.url;
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();
  };

  render() {
    return (
      <div>
        <button onClick={this.viewHandler}> View Pdf </button>
        <button onClick={this.download}>download</button>
      </div>
    );
  }
}

export default ReadAndDownold;
