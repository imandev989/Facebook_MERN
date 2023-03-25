const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");

const User = require("../models/User");
const Post = require("../models/Post");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "The email address is already exists, try a different email address",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters",
      });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must between 3 and 30 characters",
      });
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must between 3 and 30 characters",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerification = generateToken(
      {
        id: user.id.toString(),
      },
      "30m"
    );

    // console.log(emailVerification);
    const url = `${process.env.BASE_URL}/activate/${emailVerification}`;
    sendVerificationEmail(user.email, first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: " Register Success | Please activare your email to start",
    });

    // res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(user);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "this email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been activated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "the email address you entered is not connected to an account.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: "invalid credentials. Please try again." });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      // message: "Register Success | Please activate your email to start",
    });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // console.log(req);
    const { username } = req.params;
    const profile = await User.findOne({ username }).select("-password");
    // console.log(req.user);
    // console.log(req.user.id);
    // console.log("*************************profile IS*************************");
    // console.log(profile);
    if (!profile) {
      return res.json({ ok: false });
    }
    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .sort({ createdAt: -1 });
    // console.log("*************************POSTS IS************************");

    // console.log(posts);
    res.json({ ...profile.toObject(), posts });
    // res.json({ ...profile, posts});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;
    console.log("URLLLLL");
    console.log(url);
    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCover = async (req, res) => {
  try {
    const { url } = req.body;
    console.log("URLLLLL");
    console.log(url);
    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: infos,
      },
      {
        new: true,
      }
    );
    console.log("UPDATED");
    console.log(updated);
    res.json(updated.details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
