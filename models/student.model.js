import { Schema } from "mongoose";
import StudentBranch from "../enums/studentBranch.enum"
import Domains from "../enums/domains.enum"
import User from "./user.model";
import File from "./file.model";
import { Experience } from "../enums/experience.enum";
import { Background } from "../enums/background.enum";

const StudentSchema = Schema(
	{
		
		university: {
			type: Schema.Types.ObjectId, 
        	ref: 'University',
			required: "University must be specified."
		},
		
		institute: {
			type: String,
			default: null
		},
		
		degrees: {
			type: [String],
			default: []
		},
		
		background: {
			type: String,
			enum: Object.values(Background),
			default: Background.STEM
		},
	
		rollNumber: {
			type: String,
			trim: true,
			default: 'Student Roll Number is required.'
		},
		
		ssc: {
			type: Number,
			min: [0, "SSC can not be negative."],
			max: [100, "SSC must be valid."],
			default: 0
		},
		
		hsc: {
			type: Number,
			min: [0, "HSC can not be negative."],
			max: [100, "HSC must be valid."],
			default: 0
		},
		
		diploma: {
			type: Number,
			min: [0, "HSC can not be negative."],
			max: [100, "HSC must be valid."],
			default: null
		},
		
		cgpa: {
			type: Number,
			min: [0, "CGPA can not be negative."],
			max: [10, "CGPA must be valid."],
			default: 0
		},
		
		englishProficiency: {
			type: Number,
			default: 0
		},
		
		preferredDomains: {
			type: [String],
			enum : Domains,
			default: []
		},
		
		skills: [
			{
				type: String,
				trim: true
			}
		],
		
		profileLinks: {
			type: [
				{
					name: String,
					url: String
				}
			],
			validate: {
				validator: (values) => ( Array.isArray(values) && values.every(({url}) => validator.isURL(url)) ),
				message: "Profile Links is invalid."
			},
			default: []
		},
		
		pastInternships: {
			type: [
				{
					title: String,
					company: String,
					duration: String,
					description: String
				}
			],
			default: []
		},
		
		resume: {
			type: Schema.Types.ObjectId, 
        	ref: 'File',
			default: null
		},
		
		openToRemoteWork: {
			type: Boolean,
			default: false
		},
		
		openToServiceAgreement: {
			type: Boolean,
			default: false
		},
		
		lookingForInternships: {
			type: Boolean,
			default: false
		},
		
		location: {
			city: {
				type: String,
				default: null
			},
			country: {
				type: String,
				default: null
			}
		},
		
		experience: {
			type: String,
			enum: [...Object.values(Experience), null],
			default: Experience.BEGINNER	
		},
		
		mostRecentJobTitle: {
			type: String,
			default: null
		},
		
		expectedSalary: {
			type: [Number],
			validate: {
				validator: (values) => (Array.isArray(values) && ((values.length == 2 && values[0] < values[1] ) || (values.length == 0))),
				message: "Expected Salary is invalid."
			},
			default: []	
		},
		
		score: {
			type: Number,
			default: 0
		},
		
		eligibleForApply: {
			type: Boolean,
			default: false
		}
	}
)

StudentSchema.methods = {
	
	setAsEligible: function(){ 
		this.eligibleForApply = true;
	},
	isEligible: function(){
		return this.eligibleForApply;
	},
	hasUniversity: function(university){
		return this.university && this.university == university.id.toString();
	},
	canApply: function(posting){
		if(!posting.university) return true;
		return this.hasUniversity(posting.university)
	},
	addResume: async function(file){
		if(this.resume) { 
			await this.resume.deleteOne();
		}
		
		const resumeFile = new File();
		const extension = file.originalname.split('.').pop()
		
		await resumeFile.upload(file, `${this.id}.${extension}`, "Resumes");
		await resumeFile.save()
		
		this.resume = resumeFile.id
	},
	addScore: function(points){
		this.score += points
	}
	
}

const Student = User.discriminator('Student', StudentSchema)

export default Student;