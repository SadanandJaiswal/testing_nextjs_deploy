import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  },
  mobile: {
    type: String,
    // required: [true, 'Mobile number is required!'],
    // unique: [true, 'Mobile number already exists!'],
    match: [/^\d{10}$/, 'Mobile number must be a 10-digit number!']
  },
  host: {
    type: String,
    required: [true, 'Host is required!'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
  },
  intro: {
    type: String,
    maxlength: [200, 'Intro cannot be more than 200 characters!']
  }
});

// Check if model is not there in models, then only create model
const User = models.User || model("User", UserSchema);

export default User;
