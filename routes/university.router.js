import { Router } from 'express';
import * as UniversityController from '../controllers/university.controller';

const router = Router();

router.route('')
	.post('',
		UniversityController.createUniversity
	)

export default router;