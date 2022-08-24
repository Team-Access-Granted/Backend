import * as UniversityService from '../services/university.service'
import { createUniversityAdmin } from '../services/universityAdmin.service'
import AdminType from '../enums/adminType.enum';

// @desc      Onboard University
// @route     POST /api/v1/universities

// {
//     "universityAdmin" : {
//         "name" : "Vraj Parikh",
//         "password": "hello123",
//         "email" : "vrajparikh2@gmail.com",
//         "phoneNumber" : "+919998822348"
//     },
//     "name" : "Company 1",
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