import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContactController,
  deleteContactController,
  updatedContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', ctrlWrapper(getContactById));
router.post('/', ctrlWrapper(createContactController));
router.put('/:contactId', ctrlWrapper(updatedContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
export default router;