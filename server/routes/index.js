const router = require('express').Router();
const loginController = require('./controller/loginController');
const HomeController = require('./controller/HomeController');
const StockController = require('./controller/StockController');
const CommunityController = require('./controller/CommunityController');
const AdminController = require('./controller/AdminController');

router.get('/', loginController.test);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.post('/check-id-duplicate', loginController.loginCheck);
router.post('/check-nickname-duplicate', loginController.nickNameCheck);

router.post('/home', HomeController.home);

router.post('/stock', StockController.pageIn);
router.post('/chart', StockController.chart);

router.get('/board', CommunityController.wholePost);
router.post('/write', CommunityController.write);
router.post('/post', CommunityController.post);
router.get('/view/:board_id', CommunityController.view);
router.post('/comment', CommunityController.comment);
router.delete('/delete-post',CommunityController.deletePost);
router.post('/update', CommunityController.update);
router.post('/find-like',CommunityController.findLike);
router.post('/add-like',CommunityController.addLike);
router.post('/sub-like', CommunityController.subLike);

router.post('/admin/user', AdminController.user);
router.delete('/admin/user-delete',AdminController.deleteUser);
router.post('/admin/user-update', AdminController.updateUser);

router.post('/admin/company', AdminController.company);
router.delete('/admin/company-delete', AdminController.deleteCompany);
router.post('/admin/company-update', AdminController.updateCompany);
router.post('/admin/company-insert', AdminController.insert);

module.exports = router;