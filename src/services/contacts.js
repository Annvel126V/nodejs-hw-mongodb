import { Contact } from '../models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../contacts/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  // const contactCount = await Contact.find()
  //   .merge(contactsQuery)
  //   .countDocuments();

  // const contacts = await contactsQuery
  //   .skip(skip)
  //   .limit(limit)
  //   .sort({ [sortBy]: sortOrder })
  //   .exec();

  const paginationData = calculatePaginationData(contactCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findById(contactId, userId);
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
    // userId: req.user._id,
  });
  return await contact.save(); // Збереження контакту у базу даних
};
export const updateContact = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
};
export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
