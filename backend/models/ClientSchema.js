const mongoose=require('mongoose');

const ClientSchema = new mongoose.Schema({
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
  address: {
    type: String
  },
  photo: { 
    type: String 
  },
  phone: {
    type: Number
  },
  role: {
    type: String,
    enum: ["client", "serviceProvider"],
    default: "client",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  serviceList: [{
    type: mongoose.Types.ObjectId, ref: "Service"
  }],
});

module.exports=mongoose.model("Client", ClientSchema);
