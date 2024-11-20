import { Contact } from '../models/Contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite = false,
  contactType,
}) => {
  const contact = new Contact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });
  return await contact.save(); // Збереження контакту у базу даних
};
export const updatedContact = async (
  id,
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
) => {
  return await Contact.findByIdAndUpdate(
    id,
    { name, phoneNumber, email, isFavourite, contactType },
    { new: true },
  );
};
export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
