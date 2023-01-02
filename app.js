const express = require("express");
//Using Morgan Module to print the log for ever request and response and errors too
const morgan = require("morgan");
const bodyParser = require("body-parser");


const app = express();

////////////////////////////////API Routes/////////////////////////////////////////////////////////////////


const sftpCliet = require("./routes/api/sftp_route");


app.use(morgan("dev"));
app.use("/files", express.static("files"));
// app.use(bodyParser({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: false })); //to parse the Url data in thr request (like GET)
app.use(bodyParser.json()); //to parser the Json data in body(Like POST with JSON)

//CORS (Cross-Origin-Resource-Sharing) error Handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * to give acces everyone not a any single Domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Autherization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");

    return res.status(200).json({});
  }

  next(); //For Other Routes can be usd othe wise it will be return back always!!
});



//Defining Routes to the Project requestS.
app.use("/google", sftpCliet);




module.exports = app;