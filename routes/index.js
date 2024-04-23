const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { markSpam, searchPhoneNumber, searchName } = require('../controllers/contactController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/markSpam', verifyToken, markSpam);
router.get('/searchPhoneNumber', verifyToken, searchPhoneNumber);
router.get('/searchName', verifyToken, searchName);

module.exports = router;
