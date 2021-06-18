const express = require('express');
const authControler = require('../controllers/authControler');

const router = express.Router();

router.route('/signin').post(authControler.signin);
router.route('/signup').post(authControler.signup);
router.route('/verifymail').post(authControler.verifymail);
router.route('/refresh').post(authControler.refreshToken);
router.route('/forgot').post(authControler.forgot);
router.route('/setpassword').post(authControler.setpassword);
//router.post("/resendmail/:token", authController.resendmail);

module.exports = router;
