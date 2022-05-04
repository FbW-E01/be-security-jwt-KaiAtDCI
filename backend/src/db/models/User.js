"use strict"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    unique: true,
    required: true,
  },
  hash: {
    type: String,
  }
});

userSchema.statics.deleteAll = function deleteAll() {
  return this.deleteMany({}).exec();
}

export const User = mongoose.model('users', userSchema);