import mongoose, { Schema } from "mongoose";
import AdminType from "../enums/adminType.enum";
import User from "./user.model.js";

const UniversityAdminSchema = Schema(
	{
		
		university: {
			type: Schema.Types.ObjectId, 
        	ref: 'University'
		},
		
		type: {
			type: String,
			enum: Object.values(AdminType),
			default: AdminType.SUB_ADMIN
		}
		
	}
)

UniversityAdminSchema.methods = {
	
	isSuperAdmin: function(){
		return this.type == AdminType.SUPER_ADMIN
	},
	hasUniversity: function(university){
		return this.university == university.id.toString()
	}
	
}

const UniversityAdmin = mongoose.models.User.discriminators.UniversityAdmin || User.discriminator('UniversityAdmin', UniversityAdminSchema)

export default UniversityAdmin;