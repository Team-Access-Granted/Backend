import * as RequestService from "../services/request.service"
import * as ApplicationService from "../services/application.service"
import { HttpException } from "../exceptions/HttpException"
import Application from "../models/application.model"
import { applicationPopulate } from "../utils/populateHelpers"

// @desc      Get Requests
// @route     GET /api/v1/requests

export const getRequests = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Requests."))
	}else if(res.results.metadata.count == 0){
		next(new HttpException(404, "No Requests found."))
	}else{
		return res.status(200).json(res.results)
	}
	
}

// @desc      Get Request
// @route     GET /api/v1/requests/:id

export const getRequest = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Request."))
	}else if(res.results.data == null){
		next(new HttpException(404, "No Such Request found."))
	}else{
		return res.status(200).json(res.results)
	}

}

// @desc      Create Request
// @route     POST /api/v1/requests

// {
//     "text": "Request Title78fd",
//     "company": ":companyId",
//	   "university": ":universityId"
// }

export const createRequest = async (req, res, next) => {
	try {
		
		const company = res.locals.company
		const university = res.locals.university
		const createRequestData = {
			...req.body
		}

		if(university){
			createRequestData.university = university.id
		}else{
			createRequestData.company = company.id
		}
		
		const request = await RequestService.createRequest(createRequestData);
		
		return res.status(201).json({
			error: false,
			data: request,
			message: 'Request created successfully.'
		})

	} catch (err) {
		next(err)
	}
}

// @desc      Accept Request
// @route     POST /api/v1/requests/:id

export const acceptRequest = async (req, res) => {
	try{
		
		const request = res.locals.request
		
		const updatedRequest = await RequestService.acceptRequest(request)
		
		return res.status(201).json({
			error: false,
			data: Request,
			message: 'Request accepted successfully.'
		})
	} catch (error) {
		next(error)
	}
}

// @desc      Update Request
// @route     PATCH /api/v1/requests/:id

export const updateRequest = async (req, res, next) => {
	try {

		const request = res.locals.request
		const updateRequestData = {
			...req.body
		} 

		const updatedRequest = await RequestService.updateRequest(Request, updateRequestData)

		return res.status(200).json({
			err: false,
			data: updatedRequest,
			msg: "Request Updated Successfully."
		})

	} catch (error) {
		next(error)
	}
}

// @desc      Delete Request
// @route     DELETE /api/v1/requests/:id

export const deleteRequest = async (req, res, next) => {
	try {

		let request = res.locals.request
		
		const deletedRequest = await RequestService.deleteRequest(Request);
		
		return res.status(200).json({
			error: false,
			data: deletedRequest,
			message: "Request Deleted Successfully."
		})
	}
	catch (error) {
		next(error)
	}
}
