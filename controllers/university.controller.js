import * as UniversityService from '../services/university.service'
import { createUniversityAdmin } from '../services/universityAdmin.service'
import AdminType from '../enums/adminType.enum';

// @desc      Onboard University
// @route     POST /api/v1/universities

export const createUniversity = async (req, res, next) => {
	
	let university = null;
	
	try{
		
		const { universityAdmin : createUniversityAdminData, ...createUniversityData } = req.body
		
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