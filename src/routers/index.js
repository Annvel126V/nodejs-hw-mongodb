import { Router } from 'express';
import ContactRoutes from './contacts.js';
import AuthRoutes from './auth.js';

const router = Router();

router.use('/contacts', ContactRoutes);
router.use('/auth', AuthRoutes);

export default router;
