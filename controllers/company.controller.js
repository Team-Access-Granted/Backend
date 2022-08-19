import { HttpException } from "../exceptions/HttpException"
import * as CompanyService from "../services/company.service"

// @desc      Get Companies
// @route     GET /api/v1/companies

export const getCompanies = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Companies."))
	}else if(res.results.metadata.count == 0){
		next(new HttpException(404, "No Companies found."))
	}else{
		return res.status(200).json(res.results)
	}
	
}

// @desc      Get Company
// @route     GET /api/v1/companies/:id

export const getCompany = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Company."))
	}else if(res.results.data == null){
		next(new HttpException(404, "No Such Company found."))
	}else{
		return res.status(200).json(res.results)
	}

}

// @desc      Update Company
// @route     PATCH /api/v1/companies/:id

// {
// 	name : "New Name"
// }

export const updateCompany = async (req, res, next) => {
	try {

		const company = res.locals.company
		
		const updateCompanyData = {
			...req.body
		} 

		const updatedCompany = await CompanyService.updateCompany(company, updateCompanyData)

		return res.status(200).json({
			err: false,
			data: updatedCompany,
			msg: "Company Updated Successfully."
		})

	} catch (error) {
		next(error)
	}
}

// @desc      Delete Company
// @route     DELETE /api/v1/companies/:id

export const deleteCompany = async (req, res, next) => {
	try {

		let company = res.locals.company
		
		const deletedCompany = await CompanyService.deleteCompany(company);
		
		return res.status(200).json({
			error: false,
			data: deletedCompany,
			message: "Company Deleted Successfully."
		})
	}
	catch (error) {
		next(error)
	}
}