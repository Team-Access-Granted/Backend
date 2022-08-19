import { HttpException } from '../exceptions/HttpException'
import Posting, { populate } from '../models/posting.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createPosting = async ( createPostingData ) => {
	
	try {

		const posting = new Posting({
			...createPostingData
		})

		await posting.save()

		return posting;

	} catch (error) {
		
		console.log(error)
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create Posting.");
		
	}
}

export const updatePosting = async ( posting, updatePostingData ) => {
	try {

		Object.assign(posting, getUpdateFields(updatePostingData));
		
		await posting.save()

		return posting;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Posting.");
		
	}
}

export const deletePosting = async ( posting ) => {
	try {

		await posting.deleteOne();
		
		return posting;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete Posting.");
		
	}
}
