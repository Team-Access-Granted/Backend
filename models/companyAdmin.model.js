import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";
import AdminType from "../enums/adminType.enum.js";

const CompanyAdminSchema = Schema(
	{
		
		company: {
			type: Schema.Types.ObjectId, 
        	ref: 'Company'
		},
	
		type: {
			type: String,
			enum: Object.values(AdminType),
			default: AdminType.SUB_ADMIN
		}
		
	}
)

CompanyAdminSchema.methods = {
	
	isSuperAdmin: function(){
		return this.type == AdminType.SUPER_ADMIN
	},
	hasCompany: function(company){
		return (this.company == company.id.toString() || this.company == company.toString());
	}
	
}

const CompanyAdmin = mongoose.models.User.discriminators?.CompanyAdmin || User.discriminator('CompanyAdmin', CompanyAdminSchema)

export default CompanyAdmin;