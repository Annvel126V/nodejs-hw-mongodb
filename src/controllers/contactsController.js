import * as contactsService from '../services/contacts.js';

export async function getAllContacts(req, res) {
  try {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
export async function getContactById(req, res) {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      message: 'Successfully found contact with id ${contactId}!',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
