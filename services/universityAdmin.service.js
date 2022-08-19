import { HttpException } from '../exceptions/HttpException'
import UniversityAdmin, { populate } from '../models/UniversityAdmin.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createUniversityAdmin = async ( createUniversityAdminData ) => {
	
	try {

		const universityAdmin = new UniversityAdmin({
			...createUniversityAdminData
		})

		await universityAdmin.save()

		return universityAdmin;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create University Admin.");
		
	}
}

export const updateUniversityAdmin = async ( universityAdmin, updateUniversityAdminData ) => {
	try {

		Object.assign(universityAdmin, getUpdateFields(updateUniversityAdminData));
		
		await universityAdmin.save()

		return universityAdmin;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update University Admin.");
		
	}
}

export const deleteUniversityAdmin = async ( universityAdmin ) => {
	try {

		await universityAdmin.deleteOne();
		
		return universityAdmin;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete University Admin.");
		
	}
}
