import { Router } from 'express';
import { createUniversity } from '../controllers/university.controller';

const router = Router();

router.post('',
    createUniversity
)

export default router;