import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // email:,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Автоматично додає поля createdAt і updatedAt
    versionKey: false,
  },
);

const User = model('User', usersSchema);
module.exports = User;
