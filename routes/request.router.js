import { Router } from 'express'
import passport from '../config/passport.config'
import { getDocuments, getDocumentbyId } from '../middleware/modelResults'
import * as RequestController from '../controllers/request.controller'
import { requestCreatePermissions, requestAccessPermissions, requestUpdatePermissions, requestAcceptPermissions } from '../middleware/permission.middleware'
import { getRequest, getRequest, getRequestRecipient } from '../middleware/resource.middleware'
import Request from '../models/Request.model'
import { requestPopulate } from '../utils/populateHelpers'

const router = Router()

router.route("/")
	.get(
		passport.authenticate('user', { session: false }),
		requestAccessPermissions,
		getDocuments(
			Request, 
			requestPopulate
		),
		RequestController.getRequests
	)
	.post(
		passport.authenticate('user', { session: false }),
		getRequestRecipient,
		requestCreatePermissions,
		RequestController.createRequest
	)

router.route("/:requestId")
	.get(
		passport.authenticate('user', { session: false }),
		requestAccessPermissions,
		getDocumentbyId(
			Request,
			"requestId",
			requestPopulate
		),
		RequestController.getRequest
	)
	.post(
		passport.authenticate('user', { session: false }),
		getRequest,
		requestAcceptPermissions,
		RequestController.acceptRequest
	)
	.patch(
		passport.authenticate('user', { session: false }),
		getRequest,
		requestUpdatePermissions,
		RequestController.updateRequest
    )
	.delete(
		passport.authenticate('user', { session: false }),
		getRequest,
		requestUpdatePermissions,
		RequestController.deleteRequest
    )

export default router