const router = require('express').Router();
const loginController = require('./controller/loginController');
const HomeController = require('./controller/HomeController');

router.get('/', loginController.test);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.post('/check-id-duplicate', loginController.loginCheck);
router.post('/check-nickname-duplicate', loginController.nickNameCheck);

router.post('/home', HomeController.home);

module.exports = router;