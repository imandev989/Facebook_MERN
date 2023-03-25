const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");
const path = require("path");
const Post = require("../models/Post");

exports.uploadImages = async (req, res) => {
  try {
    let files = Object.values(req.files).flat();
    console.log(files);
    console.log('iman');
    console.log(path)
    let images = [];
    for (const file of files) {
      console.log(`Uploading`);
      console.log(file);
      let fileName = `${shortId.generate()}_${file.name}`;
      let uploadPath = `./public/uploads/postimages/${fileName}`;
      let imageUrl = `http://localhost:8000/public/uploads/postimages/${fileName}`;
      // let uploadPath = req.files.path;
      await sharp(file.data)
        .jpeg({ quality: 60 })
        .toFile(uploadPath)
        .catch((err) => console.log(err));
      images.push(imageUrl);
    }

    // console.log(req.body);
    // console.log(req.files.pic.name);
    // console.log(req.files.name);
    // console.log(req.files);

    // console.log("---------------------------");

    // console.log(Object.keys(req.files));

    // console.log("---------------------------");
    // console.log(Object.values(req.files).flat());

    // await sharp(file.data).jpeg({quality: 60}).toFile(uploadPath).catch((err) => console.log(err));

    // let files = Object.values(req.files).flat();
    // let images = [];
    // for (const file of files){
    //     console.log(file);

    //
    res.status(200).send(images);
  } catch (error) {
    return res.status(500).json({ message: "error.message" });
  }
};

exports.listImages = async (req, res) => {
  // res.json({ message: "hi" });
  try {
    // console.log("NNNNNNNNNNNNNNNNNNNNNNN");
    // console.log(req.user);
    // console.log(req.user.id);
    const pics = await Post.find({ user: req.user.id }).select("-_id images");
    const filterpics = pics.filter((pic) => pic.images !== null);
    const filterpics2 = filterpics.filter(pic => pic.images.length > 0);
    // console.log("FILTER NULL");
    // console.log(filterpics2);
    res.status(200).json(filterpics2);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
