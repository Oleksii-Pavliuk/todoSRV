import jwt from 'jsonwebtoken';

import config from "../config/config";
const ACCESS_TOKEN = config.get("jwtkey")



export interface User{
    username:string,
    password: string,
    admin: boolean
}

// Middleware function to generate JWT token
export const generateAccessToken = (user: User) => {
    return jwt.sign(user, ACCESS_TOKEN, { expiresIn: '2h' })
  }
  