import { HttpException } from '../exceptions/HttpException'
import University, { populate } from '../models/university.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createUniversity = async ( createUniversityData ) => {
	
	try {

		const university = new University({
			...createUniversityData
		})

		await university.save()

		return university;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create University.");
		
	}
}

export const updateUniversity = async ( university, updateUniversityData ) => {
	try {

		Object.assign(university, getUpdateFields(updateUniversityData));
		
		await university.save()

		return university;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update University.");
		
	}
}

export const deleteUniversity = async ( university ) => {
	try {

		await university.deleteOne();
		
		return university;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete University.");
		
	}
}
