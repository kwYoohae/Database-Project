const router = require('express').Router();
const loginController = require('./controller/loginController');

router.get('/', loginController.test);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

module.exports = router;