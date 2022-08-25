import * as ReviewService from "../services/review.service"
import * as ApplicationService from "../services/application.service"
import { HttpException } from "../exceptions/HttpException"
import Application from "../models/application.model"
import { applicationPopulate } from "../utils/populateHelpers"

// @desc      Get Reviews
// @route     GET /api/v1/reviews

export const getReviews = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Reviews."))
	}else if(res.results.metadata.count == 0){
		next(new HttpException(404, "No Reviews found."))
	}else{
		return res.status(200).json(res.results)
	}
	
}

// @desc      Get Review
// @route     GET /api/v1/reviews/:id

export const getReview = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get Review."))
	}else if(res.results.data == null){
		next(new HttpException(404, "No Such Review found."))
	}else{
		return res.status(200).json(res.results)
	}

}

// @desc      Create Review
// @route     POST /api/v1/reviews

export const createReview = async (req, res, next) => {
	try {
		
		const company = res.locals.company
		const user = req.user
		
		const createReviewData = {
			...req.body,
			company : company.id,
			author : user.id
		}
		
		const review = await ReviewService.createReview(createReviewData);
		
		company.addRating(review.rating)
		await company.save();
		
		user.addScore(5)
		await user.save()
		
		return res.status(201).json({
			error: false,
			data: review,
			message: 'Review created successfully.'
		})

	} catch (err) {
		next(err)
	}
}

// @desc      Update Review
// @route     PATCH /api/v1/reviews/:id

export const updateReview = async (req, res, next) => {
	try {

		const review = res.locals.review
		const updateReviewData = {
			...req.body
		} 

		const updatedReview = await ReviewService.updateReview(review, updateReviewData)

		return res.status(200).json({
			err: false,
			data: updatedReview,
			msg: "Review Updated Successfully."
		})

	} catch (error) {
		next(error)
	}
}

// @desc      Delete Review
// @route     DELETE /api/v1/reviews/:id

export const deleteReview = async (req, res, next) => {
	try {

		let review = res.locals.review
		
		const deletedReview = await ReviewService.deleteReview(review);
		
		return res.status(200).json({
			error: false,
			data: deletedReview,
			message: "Review Deleted Successfully."
		})
	}
	catch (error) {
		next(error)
	}
}
