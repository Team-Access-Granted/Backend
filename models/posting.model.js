import { Schema, model } from "mongoose";
import validator from 'validator';
import Domains from "../enums/domains.enum";
import { Experience } from "../enums/experience.enum";
import { PostingStatus } from "../enums/postingStatus.enum";
import StudentBranch from "../enums/studentBranch.enum";

const PostingSchema = Schema(
	{
		
		company: {
			type: Schema.Types.ObjectId, 
        	ref: 'Company',
			required: 'Company is required for a posting.'
		},
		
		university: {
			type: Schema.Types.ObjectId, 
        	ref: 'University',
			default: null
		},
		
		title: {
			type: String,
			trim: true,
			required: "Posting Title is required."
		},
		
		description: {
			type: String,
			trim: true,
			default: ""
		},
		
		offeredCTC: {
			type: Number,
			trim: true,
			required: "Posting CTC is required."
		},
		
		vacantPositions: {
			type: Number,
			min: [0, 'Vacant Positions can not be less than 0.'],
			required: "Posting Vacant Positions is required."
		},
		
		additionalLinks: {
			type: [String],
			validate: {
				validator: (value) => (
					!value || (Array.isArray(value) && value.every((url) => validator.isURL(url)))
				),
				message: "Invalid Additional Links."
			},
			default: []
		},
		
		internshipPeriod: {
			type: String,
			trim: true,
			default: null
		},
		
		desiredLocation: {
			city: {
				type: String,
				default: null
			},
			country: {
				type: String,
				default: null
			}
		},
		
		desiredExperience: {
			type: String,
			enum: [null, ...Object.values(Experience)],
			default: null
		},
		
		desiredDomains: {
			type: [String],
			enum: Domains,
			// validate: {
			// 	validator: (value) => (Array.isArray(value) && value.length > 0),
			// 	message: "Add atleast one desired domain."
			// }
			default: []
		},
		
		desiredDegrees: {
			type: [String],
			// validate: {
			// 	validator: (value) => (Array.isArray(value) && value.length > 0),
			// 	message: "Add atleast one desired degree."
			// }
			default: []
		},
		
		serviceAgreement: {
			type: String,
			trim: true,
			default: ""
		},
		
		minCGPA: {
			type: Number,
			default: 0
		},
		
		customQuestions: {
			type: [String],
			default: []
		},
		
		status: {
			type: String,
			enum: Object.values(PostingStatus),
			default: PostingStatus.ONGOING
		}
		
	},
	{
		timestamps: true
	}
)

PostingSchema.methods = {
	
	markAsCompleted: function(){
		this.status = PostingStatus.COMPLETED;
	},
	
	isValidApplication: function(application){
		if(!this.customQuestions || this.customQuestions.length == 0 || this.customQuestions.length == application?.answers?.length){
			return true;
		}
		return false;
	}
	
}

const Posting = model("Posting", PostingSchema);

export default Posting;