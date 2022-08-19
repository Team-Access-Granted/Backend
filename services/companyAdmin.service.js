import { HttpException } from '../exceptions/HttpException'
import CompanyAdmin, { populate } from '../models/companyAdmin.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createCompanyAdmin = async ( createCompanyAdminData ) => {
	
	try {

		const companyAdmin = new CompanyAdmin({
			...createCompanyAdminData
		})

		await companyAdmin.save()

		return companyAdmin;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create Company Admin.");
		
	}
}

export const updateCompanyAdmin = async ( companyAdmin, updateCompanyAdminData ) => {
	try {

		Object.assign(companyAdmin, getUpdateFields(updateCompanyAdminData));
		
		await companyAdmin.save()

		return companyAdmin;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Company Admin.");
		
	}
}

export const deleteCompanyAdmin = async ( companyAdmin ) => {
	try {

		await companyAdmin.deleteOne();
		
		return companyAdmin;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete Company Admin.");
		
	}
}
