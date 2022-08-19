import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model';
import CompanyAdmin from '../models/companyAdmin.model';
import Student from '../models/student.model';
import UniversityAdmin from '../models/universityAdmin.model';

import dotenv from 'dotenv'
dotenv.config()

const jwtSecret = process.env.TOKEN_SECRET_KEY

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : jwtSecret
}

passport.use(
	'user',
	new JWTStrategy(jwtOptions,async (jwt_payload,done) => {
        try{
            
			let user = await User.findOne({email : jwt_payload.id})
           	 	.select('-hashed_password');
				
			if(user){
				done(null,user)
			}else{
				done(null,false)
			}
        }
        catch(err){
            done(err)
        }
    })
)

passport.use(
    'student',
    new JWTStrategy(jwtOptions,async (jwt_payload,done) => {
        try{
            
			let student = await Student.findOne({email : jwt_payload.id})
           	 	.select('-hashed_password');
				
			if(student){
				done(null,student)
			}else{
				done(null,false)
			}
        }
        catch(err){
            done(err)
        }
    })
)

passport.use(
    'university-member',
    new JWTStrategy(jwtOptions,async (jwt_payload,done) => {
        try{
	
            let universityAdmin = await UniversityAdmin.findOne({email : jwt_payload.id})
				.select('-hashed_password')
			
            if(universityAdmin){
				done(null, universityAdmin)
			}else{
				done(null, false)
			}
			
        }
        catch(err){
            done(err)
        }
    })
)

passport.use(
    'company-member',
    new JWTStrategy(jwtOptions, async (jwt_payload,done) => {
        try{
            
			let companyAdmin = await CompanyAdmin.findOne({email : jwt_payload.id})
           	 	.select('-hashed_password')
           
			if(companyAdmin){
				done(null, companyAdmin)
			}else{
				done(null, false)
			}
        }
        catch(err){
            done(err)
        }
    })
)

passport.use(
    'university-admin',
    new JWTStrategy(jwtOptions,async (jwt_payload,done) => {
        try{
	
            let universityAdmin = await UniversityAdmin.findOne({email : jwt_payload.id})
				.select('-hashed_password')
			
            if(universityAdmin && universityAdmin.isSuperAdmin()){
				done(null, universityAdmin)
			}else{
				done(null, false)
			}
			
        }
        catch(err){
            done(err)
        }
    })
)

passport.use(
    'company-admin',
    new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
        try{
			
			let companyAdmin = await CompanyAdmin.findOne({email : jwt_payload.id})
           	 	.select('-hashed_password')
				
			if(companyAdmin && companyAdmin.isSuperAdmin()){
				done(null, companyAdmin)
			}else{
				done(null, false)
			}
        }
        catch(err){
            done(err)
        }
    })
)

export default passport