import * as PostingService from "../services/posting.service"
import * as ApplicationService from "../services/application.service"
import { HttpException } from "../exceptions/HttpException"
import Application from "../models/application.model"
import { applicationPopulate } from "../utils/populateHelpers"

// @desc      Get Postings
// @route     GET /api/v1/postings

export const getPostings = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Postings."))
	}else if(res.results.metadata.count == 0){
		next(new HttpException(404, "No Postings found."))
	}else{
		return res.status(200).json(res.results)
	}
	
}

// @desc      Get Posting
// @route     GET /api/v1/postings/:id

export const getPosting = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Posting."))
	}else if(res.results.data == null){
		next(new HttpException(404, "No Such Posting found."))
	}else{
		return res.status(200).json(res.results)
	}

}

// @desc      Create Posting
// @route     POST /api/v1/postings

// {
//     "title": "Posting Title78fd",
// 	"description": "Description",
// 	"offeredCTC": "10LPA",
// 	"vacantPositions": 10,
// 	"additionalLinks": [],
//     "desiredBranches" : ["CE","IT"],
//     "desiredDomains" : ["Machine Learning","Deep Learning"],
// 	"serviceAgreement": "None",
//     "company": ":companyId",
//	   "university": ":universityId"
// }

export const createPosting = async (req, res, next) => {
	try {
		
		const company = req.user.company;
		
		const createPostingData = {
			...req.body,
			company: company.id
		}

		const posting = await PostingService.createPosting(createPostingData);
		
		return res.status(201).json({
			error: false,
			data: posting,
			message: 'Posting created successfully.'
		})

	} catch (err) {
		next(err)
	}
}

// @desc      Mark Posting as Complete
// @route     POST /api/v1/postings/:id

export const markPostingAsComplete = async (req, res) => {
	try{
		
		const posting = res.locals.posting
		
		const applications = await Application.find({ posting : posting.id });
		
		Promise.all(applications.map( async (application) => ApplicationService.markAsPlaced(application)))
		
		posting.markAsCompleted();
		await posting.save()
		
		return res.status(201).json({
			error: false,
			data: posting,
			message: 'Posting closed successfully.'
		})
	} catch (error) {
		next(error)
	}
}

// @desc      Select candidates for next round
// @route     POST /api/v1/postings/:id/candidates

export const selectCandidatesForPosting = async (req, res) => {
	try{
		
		const posting = res.locals.posting
		const selectedEmails = (() => {
			let obj = {}
			
			req.body.emails.forEach(e => obj[e] = true);
			
			return obj;
		})()
		
		const applications = await Application.find({ posting : posting.id })
			.populate(applicationPopulate)
		
		Promise.all(applications.map( async (application) => {
			
			const applicantEmail = application.student.email;
			
			if(!selectedEmails[applicantEmail]){
				await ApplicationService.markAsPlaced(application)
			}
			
		}))
		
		return res.status(201).json({
			error: false,
			data: posting,
			message: 'Candidated selected successfully.'
		})
	} catch (error) {
		next(error)
	}
}

// @desc      Update Posting
// @route     PATCH /api/v1/postings/:id

export const updatePosting = async (req, res, next) => {
	try {

		const posting = res.locals.posting
		const updatePostingData = {
			...req.body
		} 

		const updatedPosting = await PostingService.updatePosting(posting, updatePostingData)

		return res.status(200).json({
			err: false,
			data: updatedPosting,
			msg: "Posting Updated Successfully."
		})

	} catch (error) {
		next(error)
	}
}

// @desc      Delete Posting
// @route     DELETE /api/v1/postings/:id

export const deletePosting = async (req, res, next) => {
	try {

		let posting = res.locals.posting
		
		const deletedPosting = await PostingService.deletePosting(posting);
		
		return res.status(200).json({
			error: false,
			data: deletedPosting,
			message: "Posting Deleted Successfully."
		})
	}
	catch (error) {
		next(error)
	}
}
