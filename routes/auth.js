import express from 'express';
import { createUser, signIn } from '../controller/auth.js';

export const authRoutes = express.Router();

authRoutes.route('/signup').post(createUser);
authRoutes.route('/signin').post(signIn)