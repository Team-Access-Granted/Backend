import { model, Schema } from "mongoose";

const ReviewSchema = Schema(
	{
		
		title: {
			type: String,
			required : "Review Title is required."
		},
		
		text: {
			type : String,
			required : "Review Text is required",
			trim: true
		},
		
		company: {
			type: Schema.Types.ObjectId, 
        	ref: 'Company',
			required: "Company must be specified."
		},
		
		rating: {
			type: Number,
			min: [0, "Company Rating is invalid."],
			max: [10, "Company Rating is invalid."],
			default: 0
		},
		
		author: {
			type: Schema.Types.ObjectId, 
        	ref: 'Student',
			required: "Author must be specified."
		}
		
	},
	{
		timestamps: true
	}
)

ReviewSchema.methods = {
	
	hasAuthor: function(user){
		return this.author == user.id.toString()
	}
	
}

const Review = model("Review", ReviewSchema);

export default Review;