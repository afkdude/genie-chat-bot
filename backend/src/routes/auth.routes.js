import express from "express";
import { checkAuth, loginHandler, logoutHandler, signupHandler } from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup', signupHandler);

router.post('/login', loginHandler);

router.post('/logout', logoutHandler);

//checking authentication upon every refresh
router.get('/check', protectRoute, checkAuth);


export default router; 
