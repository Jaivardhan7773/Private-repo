const User = require('../models/auth');
const upload = require('../multerConfig');

// Upload profile image
exports.uploadProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found in DB" });
    }

    const imageUrl = req.file.path;
    user.profileImage = imageUrl;
    await user.save();

    res.status(200).json({ message: "Profile image updated successfully", imageUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading profile image", error: error.message });
  }
};

// Remove profile image
exports.removeProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImage = "";
    await user.save();

    res.status(200).json({ message: "Profile image removed successfully" });
  } catch (error) {
    console.error("Remove Image Error:", error);
    res.status(500).json({ message: "Error removing profile image", error: error.message });
  }
};

