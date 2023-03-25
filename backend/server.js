const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const { readdirSync } = require("fs");

const path = require('path');

const app = express();
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: false,
  })
);

app.use('/public/uploads/postimages', express.static(path.join(__dirname, 'public', 'uploads', 'postimages')));
// app.use('/public/uploads/postimages', express.static(path.join('public', 'uploads', 'postimages')));

// let allowed = ["http://localhost:3000", "some other link"];
// function options(req, res) {
//   let tmp;
//   let origin = req.header("Origin");
//   if (allowed.indexOf(origin) > -1) {
//     tmp = {
//       origin: true,
//       optionSuccessStatus: 200,
//     };
//   } else {
//     tmp = {
//       origin: "stupid",
//     };
//   }
//   res(null, tmp);
// }

// app.use(cors(options));

app.use(cors());

//** Routes
// const useRoutes = require('./routes/user');

// app.use("/", useRoutes);

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// Database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}...`);
});
