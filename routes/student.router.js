import { Router } from 'express'
import passport from '../config/passport.config'
import { getStudent } from '../middleware/resource.middleware'
import * as StudentController from '../controllers/student.controller'
import { createPosting } from '../controllers/posting.controller'
import { getDocumentbyId, getDocuments } from '../middleware/modelResults'
import Student from '../models/student.model'

const router = Router()

router.route("/")
    .get(
		getDocuments(
			Student
		),
		StudentController.getStudents
	)

router.route("/:studentId")
	.get(
		getDocumentbyId(
			Student,
			"studentId"
		),
		StudentController.getStudent
	)
	.patch(
		passport.authenticate('student', { session: false }),
		getStudent,
		studentUpdatePermissions,
		StudentController.updateStudent
    )
	.delete(
		passport.authenticate('student', { session: false }),
		getStudent,
		studentUpdatePermissions,
		StudentController.deleteStudent
    )


export default router