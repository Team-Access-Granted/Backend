import { Schema, model } from "mongoose";
import ApplicationStatus from "../enums/applicationStatus.enum";

const ApplicationSchema = Schema(
	{
		
		student: {
			type: Schema.Types.ObjectId, 
        	ref: 'Student',
			required: "Student is required."
		},
		
		posting: {
			type: Schema.Types.ObjectId, 
        	ref: 'Posting'
		},
		
		status: {
			type: String,
			enum: Object.values(ApplicationStatus),
			default: ApplicationStatus.APPLIED
		},
		
		answers: {
			type: [String],
			default: []
		}
		
	},
	{
		timestamps: true
	}
)

ApplicationSchema.methods = {
	
	hasStudent: function(student){
		return this.student == student.id.toString()
	},
	markAsPlaced: function(){
		this.status = ApplicationStatus.PLACED
	}
	
}

const Application = model("Application", ApplicationSchema);

export default Application;