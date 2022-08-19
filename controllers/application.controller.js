import * as ApplicationService from "../services/application.service"

// @desc      Get Applications
// @route     GET /api/v1/applications

export const getApplications = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Applications."))
	}else if(res.results.metadata.count == 0){
		next(new HttpException(404, "No Applications found."))
	}else{
		return res.status(200).json(res.results)
	}
	
}

// @desc      Get Application
// @route     GET /api/v1/applications/:id

export const getApplication = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Application."))
	}else if(res.results.data == null){
		next(new HttpException(404, "No Such Application found."))
	}else{
		return res.status(200).json(res.results)
	}

}

// @desc      Create Application
// @route     POST /api/v1/applications

// {
// 	posting : ":postingId"
// }

export const createApplication = async (req, res, next) => {
	try {
		
		const student = req.user;
		const posting =  res.locals.posting;
		
		const createApplicationData = {
			...req.body,
			posting: posting.id,
			student: student.id
		}

		const application = await ApplicationService.createApplication(createApplicationData);
		
		return res.status(201).json({
			error: false,
			data: application,
			message: 'Application created successfully.'
		})

	} catch (err) {
		next(err)
	}
}

// @desc      Update Application
// @route     PATCH /api/v1/applications/:id

// {
// 	status : "Accepted"
// }

export const updateApplication = async (req, res) => {
	try {

		const application = res.locals.application
		
		const updateApplicationData = {
			...req.body
		} 

		const updatedApplication = await ApplicationService.updateApplication(application, updateApplicationData)

		return res.status(200).json({
			err: false,
			data: updatedApplication,
			msg: "Application Updated Successfully."
		})

	} catch (error) {
		next(error)
	}
}

// @desc      Delete Application
// @route     DELETE /api/v1/applications/:id

export const deleteApplication = async (req, res) => {
	try {

		let application = res.locals.application
		
		const deletedApplication = await ApplicationService.deleteApplication(application);
		
		return res.status(200).json({
			error: false,
			data: deletedApplication,
			message: "Application Deleted Successfully."
		})
	}
	catch (error) {
		next(error)
	}
}