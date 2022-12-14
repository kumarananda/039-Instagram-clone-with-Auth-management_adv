import express from 'express';
import { createUser, deleteUser, editUser, getAllUser, getLogedInUser, getSingleUser, userLogin, userRegister, verifyUserAccount, ForgotPassword, ResetPassword, PassRrecoveryCode, phoneVerifyCodeSent, phoneCodeVerify } from '../controllers/userController.js';
import adminMeddleware from '../middlewares/adminMeddleware.js';
import authMedleware from '../middlewares/authMeddleware.js';
import userMeddleware from '../middlewares/userMeddleware.js';


//init router
const router = express.Router();


// user Auth route
router.post('/login', userLogin)
router.post('/register', userRegister)
router.get('/me', getLogedInUser)
router.post('/verify', verifyUserAccount)
router.post('/forgot-password', ForgotPassword)
router.post('/pass-recovery-code', PassRrecoveryCode)
router.post('/reset-password', ResetPassword)
router.post('/phone-code-sent', phoneVerifyCodeSent)
router.post('/phone-code-verify', phoneCodeVerify)

// Routs for Rest API 
router.route('/').get(adminMeddleware, getAllUser).post(adminMeddleware, createUser);
router.route('/:id').get(userMeddleware, getSingleUser).delete(userMeddleware, deleteUser)
  .put(userMeddleware, editUser).patch(userMeddleware, editUser);



// export router
export default router;
