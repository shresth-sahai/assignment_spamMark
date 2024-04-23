
const { Contact } = require('../models/contactModel');


async function markSpam(req, res) {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({
      "Error": "Phone number required!!"
    });
  }

  try {
    // Update spam field for contacts
    const [numUpdatedContacts] = await Contact.update({ spam: true }, { where: { phoneNumber } });

    // Update spam field for users
    const [numUpdatedUsers] = await User.update({ spam: true }, { where: { phoneNumber } });

    if (numUpdatedContacts > 0 || numUpdatedUsers > 0) {
      return res.status(200).json({
        "Message": "Contact(s) and/or user(s) marked as spam successfully!!"
      });
    } else {
      return res.status(404).json({
        "Error": "Phone number not found!!"
      });
    }
  } catch (error) {
    return res.status(500).json({ "Error": error.message });
  }
}

async function searchName(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!!' });
    }
  
    const contact_start = await Contact.findAll({ where: { name: { [Op.startsWith]: name } } });
    const contact_contain = await Contact.findAll({ where: { name: { [Op.substring]: name, [Op.not]: `%${name}%` } } });

    const response = [...contact_start, ...contact_contain];

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function searchPhoneNumber(req, res) {
   try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number required!!' });
    }

    // Search for contacts with the given phone number
    
    const user = await User.findOne({ where: { phoneNumber } });
    if (user) {
      // If user is found, return him
      return res.json({
        name: user.name,
        phoneNumber: user.phoneNumber,
        spam: user.spam,
        email: user.email
      });
      
    } else {
      // If no user found, search for a contacts with the given phone number
      const contacts = await Contact.findAll({ where: { phoneNumber } });

      if (contacts.length > 0) {
        // If user found, return the user information
        return res.json(contacts);
        
      } else {
        // If neither contacts nor user found, return not found
        return res.status(404).json({ error: 'Phone number not found!!' });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  markSpam,
  searchPhoneNumber,
  searchName
};
