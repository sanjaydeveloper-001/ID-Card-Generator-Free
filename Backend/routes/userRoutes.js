const express = require("express");
const router = express.Router();
const {
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
  removeProfilePhoto
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Profile Photo
router.post("/profilePhoto" , protect , updateProfilePhoto);
router.delete("/profilePhoto" , protect , removeProfilePhoto);
// Handle Login & GetDesign
router.post("/register", register);
router.get("/getUser" , protect, getUser);
router.post("/login", login);
router.get("/design/:id", protect, getSingleDesign);

// Handle Creation!
router.post("/creations", protect, addCreation);
router.get("/creations", protect, getCreations);
router.delete("/creations/:id", protect, deleteFromCreations);

// Handle Trash!
router.get("/trash", protect, getTrash);
router.post("/trash/:id", protect, moveToTrash); 
router.put("/restore/:id", protect, restoreFromTrash);
router.delete("/trash/:id", protect, deleteFromTrash);

module.exports = router;
