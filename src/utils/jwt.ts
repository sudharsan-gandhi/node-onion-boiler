import { sign, verify } from 'jsonwebtoken'
import { password_key, secret } from './secrets'


export const generateJWTToken = (data:any): string => {
    return sign(data, secret);
}

export const verifyJWTToken = (token:string): any => {
    return verify(token, secret);
}

export const generatePasswordHash = (password: string) => {
    return sign(password, secret);
}

export const comparePasswordHash = (password: string, hash: string) => {
    return generatePasswordHash(password) === hash;
}