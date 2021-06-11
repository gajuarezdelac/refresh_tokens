const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const Auth = require('../middlewares/Auth');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refreshToken);
router.get('/user',Auth,AuthController.getUserInfo);


module.exports = router;