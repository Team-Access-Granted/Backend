import { HttpException } from '../exceptions/HttpException'
import Student, { populate } from '../models/student.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createStudent = async ( createStudentData ) => {
	
	try {

		const student = new Student({
			...createStudentData
		})

		await student.save()

		return student;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create Student.");
		
	}
}

export const updateStudent = async ( student, updateStudentData ) => {
	try {

		Object.assign(student, getUpdateFields({
			...updateStudentData,
			resume: null,
			profilePhoto: null
		}));
		
		if(updateStudentData.resume) await student.addResume(updateStudentData.resume)
		if(updateStudentData.profilePhoto) await student.addProfilePhoto(updateStudentData.profilePhoto)
	
		if(!updateStudentData.isEligible) student.setEligible()
	
		await student.save()

		return student;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Student.");
		
	}
}

export const deleteStudent = async ( student ) => {
	try {
		
		await student.deleteOne();
		
		return student;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete Student.");
		
	}
}
