import { application } from 'express'
import { HttpException } from '../exceptions/HttpException'
import Application, { populate } from '../models/application.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createApplication = async ( createApplicationData ) => {
	
	try {

		const application = new Application({
			...createApplicationData
		})

		await application.save()

		return application;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create Application.");
		
	}
}

export const markAsPlaced = async ( application ) => {
	try {

		application.markAsPlaced();
		
		await application.save();

		return application;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Application.");
		
	}
}

export const updateApplication = async ( application, updateApplicationData ) => {
	try {

		Object.assign(application, getUpdateFields(updateApplicationData));
		
		await application.save()

		return application;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Application.");
		
	}
}

export const deleteApplication = async ( application ) => {
	try {

		await application.deleteOne();
		
		return application;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete Application.");
		
	}
}
