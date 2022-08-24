import { Router } from 'express';
import * as UniversityController from '../controllers/university.controller';
import { getDocumentbyId, getDocuments } from '../middleware/modelResults';
import University from '../models/university.model';

const router = Router();

router.route('')
	.get(
		getDocuments(
			University
		),
		UniversityController.getUniversities
	)
	.post(
		UniversityController.createUniversity
	)
	
router.route('/:universityId')
	.get(
		getDocumentbyId(
			University,
			'universityId'
		),
		UniversityController.getUniversity
	)

export default router;