import express from 'express'
import {register, login, handleRefreshToken} from '../controllers/authController.js'
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/refresh',handleRefreshToken)



export default router