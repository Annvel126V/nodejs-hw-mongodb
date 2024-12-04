import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Автоматично додає поля createdAt і updatedAt
    versionKey: false,
  },
);

const Session = model('Session', sessionSchema);

module.exports = Session;
