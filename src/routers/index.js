import { Router } from 'express';
import ContactRoutes from './contacts.js';
import AuthRoutes from './auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/', authenticate, ContactRoutes);
router.use('/auth', AuthRoutes);

export default router;
