import { User } from '../models/User.js';

export const registerUser = async (payload) => {
  return await User.create(payload);
};
