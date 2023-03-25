const express = require("express");
const {
  register,
  activateAccount,
  login,
  getProfile,
  updateCover,
  updateProfilePicture,
  updateDetails,
} = require("../controllers/user");
const router = express.Router();
const { authUser } = require("../middlwares/auth");

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.get("/getProfile/:username", authUser, getProfile);
// router.get("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/updateCover", authUser, updateCover);
router.put("/updateDetails", authUser, updateDetails);




module.exports = router;
