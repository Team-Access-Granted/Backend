import AdminType from '../enums/adminType.enum';
import * as StudentService from '../services/student.service'
import * as CompanyService from '../services/company.service'
import * as CompanyAdminService from '../services/companyAdmin.service'
import User from '../models/user.model';
import University from '../models/university.model';
import { HttpException } from '../exceptions/HttpException';
import { generateToken } from '../utils/tokenUtils';

// @desc      Register as Student
// @route     POST /api/v1/auth/students/register

// {
//     "name" : "Vraj Parikh",
//     "password": "hello123",
//     "email" : "vrajparikh29@gmail.com",
//     "phoneNumber" : "+919998822348",
// }

export const registerAsStudent = async (req, res, next) => {
	
	try{
	
		const createStudentData = { 
			...req.body 
		};
		
		const user = await User.findOne({ email : createStudentData.email });
		if (user) return next(new HttpException(400,"User already registered."));
		
		if(createStudentData.university){
			
			const university = await University.findById(createStudentData.university)
			if(!university) return next(new HttpException(400,"No such university exists."));
			if(!university.isValidStudentEmail(createStudentData.email)) return next(new HttpException(400,"Invalid email address for selected university."));
		
		}
		
		const student = await StudentService.createStudent(createStudentData);
		
		return res.status(201).json({
			error: false,
			message: "Successfully signed up as a student."
		})
		
	}catch(err){
		next(err)
	}
}

// @desc      Register as Company
// @route     POST /api/v1/auth/companies/register

// {
//     "name" : "Vraj Parikh",
//     "password": "hello123",
//     "email" : "vrajparikh29@gmail.com",
//     "phoneNumber" : "+919998822348",
//     "company" : {
//         "name" : "Company 1",
//         "email" : "vrajparikh29@gmail.com",
//         "website": "www.google.com",
//         "phoneNumber" : "+919998822348",
//         "address" : "address"
//     }
// }

export const registerAsCompanyAdmin = async(req, res, next) => {
	
	let company = null;
	
	try{
		
		const { company : createCompanyData, ...createCompanyAdminData } = req.body;
		
		const user = await User.findOne({ email : createCompanyAdminData.email });
		if (user) return next(new HttpException(400,"User already registered."));
		
		company = await CompanyService.createCompany(createCompanyData);
		
		const companyAdmin = await CompanyAdminService.createCompanyAdmin({
			...createCompanyAdminData,
			type: AdminType.SUPER_ADMIN,
			company: company.id
		})
		
		return res.status(201).json({
			error: false,
			message: "Successfully signed up as a company."
		})
		
	}catch(err){
		
		if(company) await CompanyService.deleteCompany(company);
		next(err)
		
	}
}

// @desc      Login
// @route     POST /api/v1/auth/login

export const loginAsUser = async(req, res, next) => {
	
	try{
		
		const { email, password } = req.body;
		
		const user = await User.findOne({ email })
		
		if(!user || !user.authenticate(password)) {
			next( new HttpException('400', 'Invalid Email or Password Entered.'));
		}
		
		return res.status(201).json({
			error: false,
			token: generateToken(user.email),
			data: user,
			message: "Successfully logged in."
		})
		
	}catch(err){
		next(err)
	}
}
