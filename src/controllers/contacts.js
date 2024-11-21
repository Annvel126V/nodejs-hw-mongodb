import * as contactsService from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    // res.status(500).json({ message: 'Server error', error });
    next(error);
  }
};
export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      // return res.status(404).json({ message: 'Contact not found' });

      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    // res.status(500).json({ message: 'Server error', error });
    next(error);
  }
};
export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const newContact = await contactsService.createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};
export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const updateContact = await contactsService.updateContact(contactId, {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    if (!updateContact) throw createHttpError(404, 'Contact not found');
    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updateContact,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsService.deleteContact(contactId);
    if (!deleteContact) throw createHttpError(404, 'Contact not found');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
