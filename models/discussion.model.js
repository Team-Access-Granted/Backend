import { model, Schema } from "mongoose";

const DiscussionSchema = Schema(
	{
		
		title: {
			type: String,
			required : "Discussion Title is required."
		},
		
		text: {
			type : String,
			required : "Discussion Text is required",
			trim: true
		},
		
		university: {
			type: Schema.Types.ObjectId, 
        	ref: 'University',
			default: null
		}
		
	},
	{
		timestamps: true
	}
)

const Discussion = model("Discussion", DiscussionSchema);

export default Discussion;