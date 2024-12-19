import * as contactsService from '../services/contacts.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { env } from '../utils/env.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await contactsService.getAllContacts({
    userId: req.user._id,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.getContactById(
      contactId,
      req.user._id,
    );
    if (!contact) {
      return res.status(400).json({
        status: 400,
        message: 'Contact not found',
        data: {
          message: 'Id is not valid',
        },
      });

      // throw createHttpError(404, 'Contact not found');
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
export const createContactController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await contactsService.createContact(
    { ...req.body, photo: photoUrl },
    req.user,
  );

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;


  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);

    const updatedContact = await contactsService.updateContact(
      contactId,
      { name, phoneNumber, email, isFavourite, contactType }, // Передаємо об'єкт оновлення
      req.user._id, // Передаємо userId
    );

    if (!updatedContact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: null,
      });

    }
  }


  const result = await contactsService.updateContact(
    contactId,
    {
      ...req.body,
      photo: photoUrl,
    },
    req.user._id,
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact, // Повертаємо лише оновлений контакт
    });
  } catch (error) {
    next(error);

  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await contactsService.deleteContact(
    contactId,
    req.user._id,
  );
  if (!deleteContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  // throw createHttpError(404, 'Contact not found');
  res.status(204).end();
};
