const Form = require('../models/Form');
const { validationResult } = require('express-validator');

exports.createForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, notificationEmail, redirectUrl } = req.body;

  try {
    const form = new Form({
      name,
      notificationEmail,
      redirectUrl,
      owner: req.user.id, // from auth middleware
    });

    const savedForm = await form.save();

    return res.status(201).json({
      formId: savedForm._id,
      endpoint: `${process.env.BASE_URL}/api/submit/${savedForm._id}`,
      msg: 'Form created successfully',
    });

  } catch (error) {
    console.error('Form creation error:', error.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};
