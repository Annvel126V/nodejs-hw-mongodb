import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      versionKey: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      versionKey: false,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
      versionKey: false,
    },
  },
  { timestamps: true },
); // автоматично додає createdAt та updatedAt

export const Contact = model('Contact', contactSchema);
