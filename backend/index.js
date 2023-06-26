const express = require("express");
const mongoose = require("mongoose");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

mongoose.connect("mongodb://127.0.0.1/traveltracklog")
    .then(() => console.log("connected with moongoose.."))
    .catch((err) => console.log(err))

const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use("/api/pins",pinRoute);
app.use("/api/users",userRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});     
