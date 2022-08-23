import { HttpException } from '../exceptions/HttpException'
import Request, { populate } from '../models/Request.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createRequest = async ( createRequestData, user ) => {
	
	try {

		const request = new Request({
			...createRequestData
		})
		
		request.addAuthor(user)

		await request.save()

		return request;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create Request.");
		
	}
}

export const acceptRequest = async ( request ) => {
	try{
		
		request.accept();
		
		await request.save();
		
		return request;
		
	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Request.");
		
	}
}

export const updateRequest = async ( request, updateRequestData ) => {
	try {

		Object.assign(request, getUpdateFields(updateRequestData));
		
		await request.save()

		return request;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Request.");
		
	}
}

export const deleteRequest = async ( request ) => {
	try {

		await request.deleteOne();
		
		return request;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete Request.");
		
	}
}
