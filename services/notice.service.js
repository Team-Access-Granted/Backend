import { HttpException } from '../exceptions/HttpException'
import Notice from '../models/notice.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createNotice = async ( createNoticeData ) => {
	
	try {

		const notice = new Notice({
			...createNoticeData
		})

		await notice.save()

		return notice;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create Notice.");
		
	}
}

export const updateNotice = async ( notice, updateNoticeData ) => {
	try {

		Object.assign(notice, getUpdateFields(updateNoticeData));
		
		await notice.save()

		return notice;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Notice.");
		
	}
}

export const deleteNotice = async ( notice ) => {
	try {

		await notice.deleteOne();
		
		return notice;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete Notice.");
		
	}
}
