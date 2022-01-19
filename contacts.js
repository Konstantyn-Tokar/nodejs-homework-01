const fs = require("fs/promises");
const contactsPath = require("./db/contactsPath");
const { v4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (data) => {
  const newContacts = { ...data, id: v4() };
  const contacts = await listContacts();
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    null;
  }
  const newContact = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
