import React, { useEffect, useState } from "react";
import axios from "axios";
import ReadAndDownold from "../ReadAndDownold";
const SharedDocument = () => {
  const [data, setData] = useState([]);
  //   const [url, seturl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:2000/file");

      setData(result.data);
    };

    fetchData();
  }, []);

  let url;
  const viewHandler = async (file) => {
    console.log(file, "file");
    axios({
      url: `http://localhost:2000/pdf/${file.filename}`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      window.open(url);
    });
  };
  const download = async (file) => {
    // console.log("dow", file);
    // axios({
    //   url: `http://localhost:2000/pdf/${file.filename}`,
    //   method: "GET",
    //   responseType: "blob", // important
    // })
    //   .then((response) => response.blob())

    //   .then((blob) => {
    //     const url = window.URL.createObjectURL(new Blob([blob]));

    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "file.pdf");
    //     document.body.appendChild(link);
    //     link.click();
    //   });
    const link = document.createElement("a");
    link.href = `${file.filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {data.map((e) => (
        <div class="card" style={{ margin: 30 }}>
          <div style={{ display: "flex" }}>
            <img
              class="card-img-top"
              style={{ width: 100, height: 100 }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/File_alt_font_awesome.svg/1024px-File_alt_font_awesome.svg.png"
              alt="Card image cap"
            />
            <h5 class="card-title" style={{ marginTop: 50, marginLeft: 20 }}>
              {e.filename}
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>

            <button
              type="button"
              class="btn btn-link"
              onClick={() => viewHandler(e)}
            >
              {" "}
              View Document{" "}
            </button>
            {/* <button
              type="button"
              class="btn btn-link"
              onClick={() => download(e.filename)}
            >
              download
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SharedDocument;
