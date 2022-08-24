import { Schema, model } from 'mongoose';
import validator from 'validator';

const UniversitySchema = Schema(
	{
		
		name: {
			type: String,
			required : "University Name is required."
		},
		
		email: {
			type : String,
			required : "University Email is required",
			trim: true,
			lowercase: true,
			validate: {
				validator: (value) => validator.isEmail(value),
				message: "University Email is invalid."
			}
		},
		
		phoneNumber: {
			type: String,
			required : "University Contact Number is required",
			validate: {
				validator: (value) => validator.isMobilePhone(value, 'any'),
				message: "University Contact Number is invalid."
			}
		},
		
		address: {
			type: String,
			trim: true,
			required : "University Address is required."
		},
		
		website: {
			type: String,
			required : "University Website is required",
			validate: {
				validator: (value) => validator.isURL(value),
				message: "University Website is invalid."
			}
		},
		
		emailDomain: {
			type: String,
			required: "University Domain is required."
		}
		
	},
	{
		timestamps: true,
	}
)

UniversitySchema.methods = {
	
	isValidStudentEmail: function(email){
		return !this.emailDomain || email.endsWith(this.emailDomain);	
	}
	
}

export default model("University", UniversitySchema);