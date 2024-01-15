const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photo: { 
    type: String 
  },
  phone: {
    type: Number
  },
  role: {
    type: String,
    enum: ["user", "lawyer"],
    default: "user",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  serviceList: [{
    type: mongoose.Types.ObjectId, ref: "Service"
  }],
});

module.exports=mongoose.model("User", UserSchema);
