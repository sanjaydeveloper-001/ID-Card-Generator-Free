const mongoose = require('mongoose');

const idCardSchema = new mongoose.Schema({
  Address: { type: String, required: true },
  Blood: { type: String, required: true },
  DOB: { type: String, required: true }, 
  collAdd: { type: String, required: true },
  college: { type: String, required: true },
  collegeLogo: { type: String },
  colltele: { type: String },
  createdDate: { type: String },
  dept: { type: String },
  fileName: { type: String },
  name: { type: String, required: true },
  phone: { type: String },
  preview: { type: String }, 
  profile: { type: String }, 
  rollNum: { type: String }
});

const userSchema = new mongoose.Schema({
  
  firstname: String,
  lastname:String,
  password: String,
  profilePhoto: String,
  email :String,
  myCreations: [idCardSchema],
  trash: [idCardSchema],
  limits: Number,
  profilePhoto : {type:String}
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;


import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, default: "Anonymous" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
