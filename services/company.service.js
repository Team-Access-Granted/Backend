import { HttpException } from '../exceptions/HttpException'
import Company, { populate } from '../models/company.model'
import getError from '../utils/dbErrorHandler'
import { getUpdateFields } from '../utils/requestUtils'

export const createCompany = async ( createCompanyData ) => {
	
	try {

		const company = new Company({
			...createCompanyData
		})

		await company.save()

		return company;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not create Company.");
		
	}
}

export const updateCompany = async ( company, updateCompanyData ) => {
	try {

		Object.assign(company, getUpdateFields(updateCompanyData));
		
		await company.save()

		return company;

	} catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not update Company.");
		
	}
}

export const deleteCompany = async ( company ) => {
	try {

		await company.deleteOne();
		
		return company;
		
	}
	catch (error) {
		
		let errMsg = getError(error);
		throw new HttpException( 400, errMsg.length > 0 ? errMsg : "Could not delete Company.");
		
	}
}
