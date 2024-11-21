import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContactController,
  deleteContactController,
  updateContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', ctrlWrapper(getContactById));
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.patch('/:contactId', jsonParser, ctrlWrapper(updateContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
export default router;
