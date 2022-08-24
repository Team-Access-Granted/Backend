import { HttpException } from "../exceptions/HttpException"
import * as StudentService from "../services/student.service"

// @desc      Get Students
// @route     GET /api/v1/students

export const getStudents = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get students."))
	}else if(res.results.metadata.count == 0){
		next(new HttpException(404, "No Students found."))
	}else{
		return res.status(200).json(res.results)
	}
	
}

// @desc      Get Student
// @route     GET /api/v1/students/:id

export const getStudent = async (req, res, next) => {
	
	if(res.results.err){
		next(new HttpException(400, "Could not get student."))
	}else if(res.results.data == null){
		next(new HttpException(404, "No Such Student found."))
	}else{
		return res.status(200).json(res.results)
	}

}

// @desc      Update Student
// @route     PATCH /api/v1/students/:id

export const updateStudent = async (req, res, next) => {
	try {

		const student = res.locals.student
		
		const updateStudentData = {
			...req.body,
			resume: req.files?.resume[0],
			profilePhoto: req.files?.profilePhoto[0]
		} 
		
		const updatedStudent = await StudentService.updateStudent(student, updateStudentData)

		return res.status(200).json({
			err: false,
			data: updatedStudent,
			msg: "Student Updated Successfully."
		})

	} catch (error) {
		next(error)
	}
}

// @desc      Delete Student
// @route     DELETE /api/v1/students/:id

export const deleteStudent = async (req, res, next) => {
	try {

		let student = res.locals.student
		
		const deletedStudent = await StudentService.deleteStudent(student);
		
		return res.status(200).json({
			error: false,
			data: deletedStudent,
			message: "Student Deleted Successfully."
		})
	}
	catch (error) {
		next(error)
	}
}