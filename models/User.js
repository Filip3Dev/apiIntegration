const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Precisamos do seu nome completo"]
  },
  document: {
    type: String,
    required: [true, "Precisamos do seu CPF?"]
  },
  image: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true
  },
  passResetExpires: {
    type: Date,
    required: false,
  },
  passResetToken: {
    type: String,
    required: false,
  },
  accountTokenValidate: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  onesignalAccountToken: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["active", "deactive"],
    default: "deactive"
  },
}, { timestamps: true });
module.exports = mongoose.model("Users", UserSchema);
