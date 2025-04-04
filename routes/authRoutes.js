import express from 'express'
import {register, login, hadleRefreshToken} from '../controllers/authController.js'
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/refresh',hadleRefreshToken)



export default router