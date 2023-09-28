import * as express from "express";
import AuthService from './Auth.service.js'

const route = express.Router();

route.post('/register', (req, res) => AuthService.register(req, res))

route.post('/login', (req, res) => AuthService.login(req, res))

export default route;