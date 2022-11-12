const router = require('express').Router();
const loginController = require('./controller/loginController');

router.get('/', loginController.test);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.post('/login-check', loginController.loginCheck);

module.exports = router;