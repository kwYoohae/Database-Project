const router = require('express').Router();
const loginController = require('./controller/loginController');
const HomeController = require('./controller/HomeController');
const StockController = require('./controller/StockController');
const CommunityController = require('./controller/CommunityController');

router.get('/', loginController.test);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.post('/check-id-duplicate', loginController.loginCheck);
router.post('/check-nickname-duplicate', loginController.nickNameCheck);

router.post('/home', HomeController.home);

router.post('/stock', StockController.pageIn);

router.get('/board', CommunityController.wholePost);
router.post('/write', CommunityController.write);
module.exports = router;