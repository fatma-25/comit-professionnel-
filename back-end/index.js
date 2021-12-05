//create a server
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const Files = require("./Models/File");

//dotenv
require("dotenv").config();
//import the connect function
const connectDB = require("./config/connectDB");
connectDB();
//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", require("./routes/users"));

//listen to the port
const Port = 2000;
app.listen(Port, (err) => {
  err ? console.log(err) : console.log(`the server is running on ${Port} `);
});

// // Upload
app.use(fileUpload());
app.use(express.static("files"));
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  console.log(req.files.file, "file");
  console.log(__dirname, "file");
  file.mv(`${__dirname}/../front-end/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ filename: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.post("/addfile", async (req, res) => {
  // const { image, title, description, filename } = req.body;
  const { filename } = req.body;

  // Files.findOne({ title }).then((file) => {
  //   if (file) {
  //     return res.json({ msg: "file already exist" });
  //   } else {
  const newfile = new Files({
    // image,
    // title,
    // description,
    filename,
  });
  await newfile
    .save()
    .then((file) => res.send(file))
    .catch((err) => {
      res.send(err);
    });
  // }
  // });
});

app.get("/file/:id", (req, res) => {
  const id = req.params.id;
  Files.findOne({ _id: id }, (err, file) => {
    if (err) res.send("cannot find file");
    else res.send(file);
  });
});

app.get("/file", (req, res) => {
  Files.find().then((file) => res.send(file));
  // .catch((err) => console.log(err));
});

app.get(`/pdf/:fileName`, (req, res) => {
  // var file = fs.createReadStream(`${__dirname}/client/public/uploads/bac-pratique-2016-tic.pdf`)
  console.log(req.params.fileName, "req.params.fileName");
  var file = fs.createReadStream(
    `${__dirname}/../front-end/public/uploads/${req.params.fileName}`
  );
  file.pipe(res);
});
