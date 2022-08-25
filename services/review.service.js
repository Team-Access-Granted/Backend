import { HttpException } from '../exceptions/HttpException'
import Review, { populate } from '../models/review.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createReview = async ( createReviewData ) => {
	
	try {

		const review = new Review({
			...createReviewData
		})

		await review.save()

		return review;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create Review.");
		
	}
}

export const updateReview = async ( review, updateReviewData ) => {
	try {

		Object.assign(review, getUpdateFields(updateReviewData));
		
		await review.save()

		return review;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Review.");
		
	}
}

export const deleteReview = async ( review ) => {
	try {

		await review.deleteOne();
		
		return review;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete Review.");
		
	}
}
