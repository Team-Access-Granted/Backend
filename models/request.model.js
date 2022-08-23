import { model, Schema } from "mongoose";

const RequestSchema = Schema(
	{
		
		author_id : {
			type: Schema.Types.ObjectId, 
			required: true,
		},
		
		author_model : {
			type : String,
			required : true
		},
		
		text: {
			type : String,
			required : "Request Text is required",
			trim: true
		},
		
		university: {
			type: Schema.Types.ObjectId, 
        	ref: 'University',
			required: "University is required."
		},
		
		company: {
			type: Schema.Types.ObjectId, 
        	ref: 'Company',
			required: "Company is required."
		},
		
		accepted: {
			type: Boolean,
			default: false
		}
		
	},
	{
		timestamps: true
	}
)

RequestSchema.methods = {

	accept: function(){
		this.accepted = true
	},
	
	canAccept: function(user){
		return (user.isSuperAdmin()) && 
			(
				(user.isCompanyAdmin() && this.author_model === 'University Admin') || 
				(user.isUniversityAdmin() && this.author_model === 'Company Admin')
			)
	},
	
	addAuthor: function(author){
		this.author = author.id
		
		if(author.isCompanyAdmin()){
			this.author_model = 'Company Admin'
			this.company = author.company
		}else{
			this.author_model = 'University Admin'
			this.university = author.university
		}
	},
	
	hasAuthor: function(user){
		return this.author == user.id.toString()
	}
	
}

const Request = model("Request", RequestSchema);

export default Request;