const User = require('../Models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.updateProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { profilePhoto } = req.body;

    if (!profilePhoto) return res.status(400).json({ msg: "Photo URL is required" });

    user.profilePhoto = profilePhoto;
    await user.save();

    res.json({ msg: "Profile photo updated successfully", profilePhoto });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update profile photo", error: err.message });
  }
};

exports.removeProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.profilePhoto = null;
    await user.save();

    res.json({ msg: "Profile photo removed successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to remove profile photo", error: err.message });
  }
};


exports.register = async (req, res) => {
  const { firstname , lastname , email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "Email is Already Registered!" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ firstname , lastname , password: hashedPassword, email});
  res.json({ token: generateToken(user._id) });
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
}

exports.login = async (req, res) => {
  const { email , password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found!" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Password Wrong!" });

  res.json({ token: generateToken(user._id) });
};

exports.getSingleDesign = async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = req.params.id;
  const creation = [...user.myCreations, ...user.trash].find(c => c._id.toString() === id);
  if (!creation) return res.status(404).json({ msg: "Design not found" });
  res.json(creation);
};


// Handle Trash

exports.getTrash = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.trash);
};


exports.moveToTrash = async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = req.params.id;

  const index = user.myCreations.findIndex(c => c._id.equals(id));
  if (index === -1) return res.status(404).json({ msg: "Creation not found" });

  const [removed] = user.myCreations.splice(index, 1);
  user.trash.push(removed); 
  await user.save();

  res.json({ msg: "Moved to trash", removed });
};

exports.restoreFromTrash = async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = req.params.id;

  const index = user.trash.findIndex(c => c._id.toString() === id);
  if (index === -1) return res.status(404).json({ msg: "Item not found in trash" });

  const [restored] = user.trash.splice(index, 1);
  user.myCreations.push(restored);

  await user.save();
  res.json({ msg: "Restored successfully", restored });
};

exports.deleteFromTrash = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.trash = user.trash.filter(c => c._id.toString() !== req.params.id);
  await user.save();
  res.json({ msg: "Deleted permanently" });
};


// Handle Creations

exports.addCreation = async (req, res) => {
  const user = await User.findById(req.user.id);
  const creation = req.body;

  if (!creation || Object.keys(creation).length === 0) {
    return res.status(400).json({ msg: "Creation data is required" });
  }

  user.myCreations.push(creation);
  await user.save();
  res.status(201).json({ msg: "Creation added successfully", creation });
};

exports.getCreations = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.myCreations);
};

exports.deleteFromCreations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const id = req.params.id;

    user.myCreations = user.myCreations.filter(c => c._id.toString() !== id);

    await user.save();
    res.json({ msg: "Deleted from creations successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete", error: err.message });
  }
};