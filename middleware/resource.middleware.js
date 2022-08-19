import Company from "../models/company.model"
import Application from "../models/application.model"
import Posting from "../models/posting.model"
import { HttpException } from "../exceptions/HttpException"
import { applicationPopulate, postingPopulate } from "../utils/populateHelpers";

export async function getCompany(req, res, next) {
	
	const companyId = req.params.companyId || req.body.company;

	if (!companyId) {
		next(new HttpException(404, "Company Id is not specified."))
	}

	let company = await Company.findById(companyId)

	if (!company) {
		next(new HttpException(400, "No such company exists."))
	} else {
		res.locals.company = company
		next()
	}
	
}

export async function getApplication(req, res, next) {
	
	const applicationId = req.params.applicationId || req.body.application;
	
	if (!applicationId) {
		next(new HttpException(404, "ApplicationId was not specified."))
	}

	let application = await Application.findById(applicationId)
		.populate(applicationPopulate)

	if (!application) {
		next(new HttpException(400, "No such Application exists."))
	} else {

		res.locals.application = application
		next()

	}
}

export async function getPosting(req, res, next) {
	
	const postingId = req.params.postingId || req.body.posting;
	
	if (!postingId) {
		next(new HttpException(404, "PostingId was not specified."))
	}

	let posting = await Posting.findById(postingId)
		.populate(postingPopulate)

	if (!posting) {
		next(new HttpException(400, "No such Posting exists."))
	} else {

		res.locals.posting = posting
		next()

	}
}