import { model, Schema } from "mongoose";
import validator from 'validator';

const CompanySchema = Schema(
	{
		
		name: {
			type: String,
			required : "Company Name is required."
		},
		
		email: {
			type : String,
			required : "Company Email is required",
			trim: true,
			lowercase: true,
			validate: {
				validator: (value) => validator.isEmail(value),
				message: "Company Email is invalid."
			}
		},
		
		phoneNumber: {
			type: String,
			required : "Company Contact Number is required",
			validate: {
				validator: (value) => validator.isMobilePhone(value, 'any'),
				message: "Company Contact Number is invalid."
			}
		},
		
		address: {
			type: String,
			trim: true,
			required : "Company Address is required."
		},
		
		website: {
			type: String,
			required : "Company Website is required",
			validate: {
				validator: (value) => validator.isURL(value),
				message: "Company Website is invalid."
			}
		}	
		
	},
	{
		timestamps: true
	}
)

const Company = model("Company", CompanySchema);

export default Company;