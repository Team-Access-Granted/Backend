import { Router } from 'express'
import passport from '../config/passport.config'
import { getDocuments, getDocumentbyId } from '../middleware/modelResults'
import * as PostingController from '../controllers/posting.controller'
import { postingAccessPermissions, postingUpdatePermissions, companyUpdatePermissions } from '../middleware/permission.middleware'
import { getCompany, getPosting, getRecommendedPostings, selectRecommendedPostings } from '../middleware/resource.middleware'
import Posting from '../models/posting.model'
import { postingPopulate } from '../utils/populateHelpers'

const router = Router()

router.route("/")
	.get(
		passport.authenticate('user', { session: false }),
		postingAccessPermissions,
		getDocuments(
			Posting, 
			postingPopulate
		),
		PostingController.getPostings
	)
	.post(
		passport.authenticate('company-admin', { session: false }),
		getCompany,
		companyUpdatePermissions,
		PostingController.createPosting
	)
	
router.route("/recommendations")
	.get(
		passport.authenticate('student', { session: false }),
		postingAccessPermissions,
		selectRecommendedPostings,
		getDocuments(
			Posting, 
			postingPopulate
		),
		PostingController.getPostings
	)

router.route("/:postingId")
	.get(
		passport.authenticate('user', { session: false }),
		postingAccessPermissions,
		getDocumentbyId(
			Posting,
			"postingId",
			postingPopulate
		),
		PostingController.getPosting
	)
	.post(
		passport.authenticate('company-admin', { session: false }),
		getPosting,
		postingUpdatePermissions,
		PostingController.markPostingAsComplete
	)
	.patch(
		passport.authenticate('company-admin', { session: false }),
		getPosting,
		postingUpdatePermissions,
		PostingController.updatePosting
    )
	.delete(
		passport.authenticate('company-admin', { session: false }),
		getPosting,
		postingUpdatePermissions,
		PostingController.deletePosting
    )
	
router.route("/:postingId/candidates")
	.post(
		passport.authenticate('company-admin', { session: false }),
		getPosting,
		postingUpdatePermissions,
		PostingController.selectCandidatesForPosting
	)

export default router