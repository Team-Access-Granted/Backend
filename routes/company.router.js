import { Router } from 'express'
import passport from '../config/passport.config'
import { companyUpdatePermissions, postingUpdatePermissions } from '../middleware/permission.middleware'
import { getCompany } from '../middleware/resource.middleware'
import { updateCompany, deleteCompany, getCompanies } from '../controllers/company.controller'
import { createPosting } from '../controllers/posting.controller'
import { getDocumentbyId, getDocuments } from '../middleware/modelResults'
import Company from '../models/company.model'

const router = Router()

router.route("/")
    .get(
		getDocuments(
			Company
		),
		getCompanies
	)

router.route("/:companyId")
	.get(
		getDocumentbyId(
			Company,
			"companyId"
		)
	)
	.patch(
		passport.authenticate('company-admin', { session: false }),
		getCompany,
		companyUpdatePermissions,
		updateCompany
    )
	.delete(
		passport.authenticate('company-admin', { session: false }),
		getCompany,
		companyUpdatePermissions,
		deleteCompany
    )


export default router