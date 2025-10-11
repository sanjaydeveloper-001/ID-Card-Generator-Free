const User = require('../Models/User');
const sendEmail = require("../utils/sendMail.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstname: name.split(" ")[0],
        lastname: name.split(" ")[1] || "",
        email,
        password: null,
        profilePhoto: picture,
        provider: "google",
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token: jwtToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Google Login Failed" });
  }
};

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const updateProfilePhoto = async (req, res) => {
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

const removeProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.profilePhoto = null;
    await user.save();

    res.json({ msg: "Profile photo removed successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to remove profile photo", error: err.message });
  }
};


const register = async (req, res) => {
  const { firstname , lastname , email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "Email is Already Registered!" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ firstname , lastname , password: hashedPassword, email});

  const subject = "Welcome to ID Card Generator!";
  const html = `
    <h1>Hello ${firstname}${lastname}!</h1>
    <p>You have successfully registered on our <strong>ID Card Generator</strong> website.</p>
    <p>Start creating your ID cards now!</p>
  `;

  sendEmail(email, subject, html);

  res.json({ token: generateToken(user._id) });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
}

const login = async (req, res) => {
  const { email , password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found!" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Password Wrong!" });

  res.json({ token: generateToken(user._id) });
};

const getSingleDesign = async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = req.params.id;
  const creation = [...user.myCreations, ...user.trash].find(c => c._id.toString() === id);
  if (!creation) return res.status(404).json({ msg: "Design not found" });
  res.json(creation);
};


// Handle Trash

const getTrash = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.trash);
};


const moveToTrash = async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = req.params.id;

  const index = user.myCreations.findIndex(c => c._id.equals(id));
  if (index === -1) return res.status(404).json({ msg: "Creation not found" });

  const [removed] = user.myCreations.splice(index, 1);
  user.trash.push(removed); 
  await user.save();

  res.json({ msg: "Moved to trash", removed });
};

const restoreFromTrash = async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = req.params.id;

  const index = user.trash.findIndex(c => c._id.toString() === id);
  if (index === -1) return res.status(404).json({ msg: "Item not found in trash" });

  const [restored] = user.trash.splice(index, 1);
  user.myCreations.push(restored);

  await user.save();
  res.json({ msg: "Restored successfully", restored });
};

const deleteFromTrash = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.trash = user.trash.filter(c => c._id.toString() !== req.params.id);
  await user.save();
  res.json({ msg: "Deleted permanently" });
};


// Handle Creations

const addCreation = async (req, res) => {
  const user = await User.findById(req.user.id);
  const creation = req.body;

  if (!creation || Object.keys(creation).length === 0) {
    return res.status(400).json({ msg: "Creation data is required" });
  }

  user.myCreations.push(creation);
  await user.save();
  res.status(201).json({ msg: "Creation added successfully", creation });
};

const getCreations = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.myCreations);
};

const deleteFromCreations = async (req, res) => {
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


module.exports = {
  register,
  login,
  getSingleDesign,
  addCreation,
  getCreations,
  deleteFromCreations,
  getTrash,
  deleteFromTrash,
  moveToTrash,
  restoreFromTrash,
  getUser,
  updateProfilePhoto,
  removeProfilePhoto,
  googleLogin
};