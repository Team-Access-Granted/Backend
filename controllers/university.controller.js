import * as UniversityService from '../services/university.service'
import { createUniversityAdmin } from '../services/universityAdmin.service'
import AdminType from '../enums/adminType.enum';

// @desc      Get Universities
// @route     GET /api/v1/universities

export const getUniversities = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get universities."))
	}else if(res.results.metadata.count == 0){
		next(new HttpException(404, "No universities found."))
	}else{
		return res.status(200).json(res.results)
	}
	
}

// @desc      Get University
// @route     GET /api/v1/universities/:id

export const getUniversity = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get University."))
	}else if(res.results.data == null){
		next(new HttpException(404, "No Such University found."))
	}else{
		return res.status(200).json(res.results)
	}

}

// @desc      Onboard University
// @route     POST /api/v1/universities

// {
//     "universityAdmin" : {
//         "name" : "Vraj Parikh",
//         "password": "hello123",
//         "email" : "vrajparikh2@gmail.com",
//         "phoneNumber" : "+919998822348"
//     },
//     "name" : "University 1",
//     "email" : "vrajparikh29@gmail.com",
//     "website": "www.google.com",
//     "phoneNumber" : "+919998822348",
//     "address" : "address",
//     "emailDomain" : "charusat.edu.in"
// }

export const createUniversity = async (req, res, next) => {
	
	let university = null;
	
	try{
		
		const { universityAdmin : createUniversityAdminData, ...createUniversityData } = req.body
		
		console.log(createUniversityData)
		
		university = await UniversityService.createUniversity(createUniversityData);
		
		const universityAdmin = await createUniversityAdmin({
			...createUniversityAdminData,
			type: AdminType.SUPER_ADMIN,
			university: university.id
		})
		
		return res.status(201).json({
			error: false,
			data: university,
			message: "Successfully onboarded a university."
		})
		
	}catch(err){
		
		if(university) await UniversityService.deleteUniversity(university)
		next(err)
		
	}
	
}