import { Router } from 'express'
import passport from '../config/passport.config'
import { getDocuments, getDocumentbyId } from '../middleware/modelResults'
import * as ReviewController from '../controllers/Review.controller'
import { reviewUpdatePermissions } from '../middleware/permission.middleware'
import { getCompany, getReview } from '../middleware/resource.middleware'
import Review from '../models/review.model'
import { reviewPopulate } from '../utils/populateHelpers'

const router = Router()

router.route("/")
	.get(
		passport.authenticate('user', { session: false }),
		getDocuments(
			Review, 
			reviewPopulate
		),
		ReviewController.getReviews
	)
	.post(
		passport.authenticate('student', { session: false }),
		getCompany,
		ReviewController.createReview
	)

router.route("/:reviewId")
	.get(
		passport.authenticate('user', { session: false }),
		getDocumentbyId(
			Review,
			"reviewId",
			reviewPopulate
		),
		ReviewController.getReview
	)
	.patch(
		passport.authenticate('student', { session: false }),
		getReview,
		reviewUpdatePermissions,
		ReviewController.updateReview
    )
	.delete(
		passport.authenticate('student', { session: false }),
		getReview,
		reviewUpdatePermissions,
		ReviewController.deleteReview
    )

export default router