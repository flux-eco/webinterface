import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const getAccessToken = (req: any) => {
    return req.headers['authorization']?.split(' ')[1];
}

export const encrypt = (val: string): Promise<string> => {
    return bcrypt.hash(val, process.env.HASH_SALT);
}

export const jwtSign = (payload: object): string => {
    return jwt.sign(payload, process.env.JWT_SALT);
}

export const jwtVerify = (token: string): string | object => {
    return jwt.verify(token, process.env.JWT_SALT);
}