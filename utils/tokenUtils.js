import { randomBytes } from 'crypto';
import { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createToken = () => {
    let resetToken = randomBytes(32).toString("hex");
    let hash = hashSync(resetToken, Number(process.env.BCRYPT_SALT_ROUNDS));
    return {token : resetToken,hash : hash}
}

export const generateToken = (email) => {
	
	const jwtSecret = process.env.TOKEN_SECRET_KEY;
	const jwtExpiresIn = process.env.TOKEN_EXPIRES_IN;
	
	return {
		token : jwt.sign( { id : email }, jwtSecret, { expiresIn : jwtExpiresIn }),
		expiresIn : jwtExpiresIn
	}
	
}
