import { Router } from 'express'
import passport from '../config/passport.config'
import Application from '../models/application.model'
import { applicationAccessPermissions, applicationUpdatePermissions, postingApplyPermissions, postingUpdatePermissions } from '../middleware/permission.middleware'
import { getApplication, getCompany, getPosting } from '../middleware/resource.middleware'
import { getDocuments, getDocumentbyId } from '../middleware/modelResults'
import * as ApplicationController from '../controllers/application.controller'
import { applicationPopulate } from '../utils/populateHelpers'

const router = Router()

router.route("/")
	.get(
		passport.authenticate('user', { session: false }),
		applicationAccessPermissions,
		getDocuments(
			Application, 
			applicationPopulate
		),
		ApplicationController.getApplications
	)
    .post(
		passport.authenticate('student', { session: false }),
		getPosting,
		postingApplyPermissions,
        ApplicationController.createApplication
    )

router.route("/:applicationId")
	.patch(
		passport.authenticate('company-member', { session: false }),
		getApplication,
		applicationUpdatePermissions,
		ApplicationController.updateApplication
    )
	.delete(
		passport.authenticate('student', { session: false }),
		getApplication,
		applicationUpdatePermissions,
		ApplicationController.deleteApplication
    )

export default router