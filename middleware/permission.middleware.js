import { HttpException } from "../exceptions/HttpException"

export const companyUpdatePermissions = (req, res, next) => {
	
	const company = res.locals.company
	const user = req.user
	
	if(user.hasCompany(company) && user.isSuperAdmin()){
		next()
	}else{
		next(new HttpException(401, "Incorrect Permissions."))
	}
	
}


export const postingAccessPermissions = (req, res, next) => {
	
	const user = req.user
	
	if(user.isStudent()){
		if(!user.university){
			req.query.university = { $type: 10 }
		}else{
			req.query.university = { $in : [ user.university, null ]}
		}
	}
	
	next()
}

export const postingUpdatePermissions = (req, res, next) => {
	
	const posting = res.locals.posting
	const user = req.user
	
	if(user.hasCompany(posting.company) && user.isSuperAdmin()){
		next()
	}else{
		next(new HttpException(401, "Incorrect Permissions."))
	}
	
}

export const postingApplyPermissions = (req, res, next) => {
	
	const user = req.user
	const posting = res.locals.posting
	
	if(user.canApply(posting) && posting.isValidApplication(req.body)){
		next()
	}else{
		next(new HttpException(401, "Student is not eligible to apply yet."))
	}
	
}

export const applicationAccessPermissions = (req, res, next) => {
	
	const user = req.user
	
	if(user.isStudent()){
		if(!user.university){
			req.query.university = { $type: 10 }
		}else{
			req.query.university = { $in : [ user.university, null ]}
		}
	}
	
	next()
}

export const applicationUpdatePermissions = (req, res, next) => {
	
	const application = res.locals.application
	const user = req.user
	
	if(
		(user.isStudent() && application.hasStudent(user)) ||
		(user.isCompanyAdmin() && user.hasCompany(application.posting.company))
	){
		next()
	}else{
		next(new HttpException(401, "Incorrect Permissions."))
	}
	
}