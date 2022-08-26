import Company from "../models/company.model"
import Application from "../models/application.model"
import Posting from "../models/posting.model"
import Request from "../models/request.model"
import University from "../models/university.model"
import { HttpException } from "../exceptions/HttpException"
import { applicationPopulate, postingPopulate } from "../utils/populateHelpers";
import { getDocuments } from "./modelResults"

export async function getUniversity(req, res, next) {
	
	const universityId = req.params.universityId || req.body.university;

	if (!universityId) {
		next(new HttpException(404, "University Id is not specified."))
	}

	let university = await University.findById(universityId)

	if (!university) {
		next(new HttpException(400, "No such university exists."))
	} else {
		res.locals.university = university
		next()
	}
	
}

export async function getCompany(req, res, next) {
	
	const companyId = req.params.companyId || req.body.company || req.user.company.id;
	
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

export const getRequest = async (req, res, next) => {
	
	const requestId = req.params.requestId || req.body.request;
	
	if (!requestId) {
		next(new HttpException(404, "RequestId was not specified."))
	}

	let request = await Request.findById(requestId)
		.populate(requestPopulate)

	if (!request) {
		next(new HttpException(400, "No such Request exists."))
	} else {

		res.locals.request = request
		next()

	}
	
}

export const getReview = async (req, res, next) => {
	
	const reviewId = req.params.reviewId || req.body.review;
	
	if (!reviewId) {
		next(new HttpException(404, "ReviewId was not specified."))
	}

	let review = await Review.findById(reviewId)
	
	if (!review) {
		next(new HttpException(400, "No such Review exists."))
	} else {

		res.locals.review = review
		next()

	}
	
}

export const getRequestRecipient = async (req, res, next) => {
	
	const universityId = req.body.university; 
	const companyId = req.body.company;
	
	if(universityId){
		
		let university = await University.findById(universityId)

		if (!university) {
			next(new HttpException(400, "No such university exists."))
		} else {
			res.locals.university = university
			next()
		}
			
	}else if(companyId){
		
		let company = await Company.findById(companyId)

		if (!company) {
			next(new HttpException(400, "No such company exists."))
		} else {
			res.locals.company = company
			next()
		}
		
	}else{
		next(new HttpException(400, "No recipient for request selected."))
	}
	
}

export const selectRecommendedPostings = (req, res, next) => {
	
	res.locals.filter = getRecommendedPostingsUtil(req.user)
	next()
	
}


export const getRecommendedPostingsUtil = (user) => {

	let { degrees, preferredDomains, openToServiceAgreement, openToRemoteWork, lookingForInternships, mostRecentJobTitle, expectedSalary, experience, location } = user;

	let filter = []
	
	if(degrees.length > 0){
		filter.push({ 'preferredDegrees' : { '$elemMatch' : { '$in' : degrees }}})
	}
	
	if(preferredDomains.length > 0){
		filter.push({ 'preferredDomains' : { '$elemMatch' : { '$in' : preferredDomains }}})
	}
	
	if(openToRemoteWork){
		filter.push({ 'remoteWork' : true })
	}
	
	if(openToServiceAgreement){
		filter.push({ 'serviceAgreement' : null })
	}
	
	if(lookingForInternships){
		filter.push({ 'internshipPeriod' : null })
	}
	
	if(mostRecentJobTitle){
		filter.push({ 'title' : new RegExp(mostRecentJobTitle,'i') })
	}
	
	if(expectedSalary && expectedSalary.length > 0){
		filter.push({ $and : [ { 'offeredCTC' : { $gte : expectedSalary[0] }}, { 'offeredCTC' : { $lte : expectedSalary[1] }} ]})
	}
	
	if(experience){
		filter.push({ 'desiredExperience' : experience })
	}
	
	if(location){
		filter.push({ 'desiredLocation' : location })
	}
	
	return getDocuments(Posting, postingPopulate, { $or : filter });
}
