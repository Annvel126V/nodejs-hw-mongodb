import { registerUser, loginUser, logoutUser } from '../services/auth';
import { THIRTY_DAYS } from '../contacts/index.js';
import { Session } from '../models/Session.js';
export const registerUserController = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const registeredUser = await registerUser(payload);

  res.send({
    status: 201,
    message: 'Successfully registered a user!',
    data: registeredUser,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  res.cookie('refreshToken', Session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', Session._Id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  await loginUser(email, password);

  res.send({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: Session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookie.sessionId) {
    await logoutUser(req.cookie.sessionId);
  }
  res.clearCookie('session_Id');
  res.clearCookie('refrehsToken');

  res.status(204).send();
};
