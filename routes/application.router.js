import { Router } from 'express'
import passport from '../config/passport.config'
import { applicationUpdatePermissions, postingApplyPermissions, postingUpdatePermissions } from '../middleware/permission.middleware'
import { getApplication, getCompany, getPosting } from '../middleware/resource.middleware'
import { createApplication, updateApplication, deleteApplication } from '../controllers/application.controller'

const router = Router()

router.route("/")
    .post(
		passport.authenticate('student', { session: false }),
		getPosting,
		postingApplyPermissions,
        createApplication
    )

router.route("/:applicationId")
	.patch(
		passport.authenticate('company-member', { session: false }),
		getApplication,
		applicationUpdatePermissions,
		updateApplication
    )
	.delete(
		passport.authenticate('student', { session: false }),
		getApplication,
		applicationUpdatePermissions,
		deleteApplication
    )

export default router