const express = require('express');
const { submitForm } = require('../controllers/submissionController');
const router = express.Router();
const submissionLimiter = require('../middleware/rateLimiter');
// Publicly accessible form endpoint
router.post('/submit/:formId', submissionLimiter, submitForm);

module.exports = router;
