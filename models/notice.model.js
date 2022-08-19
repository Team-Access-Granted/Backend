import { model, Schema } from "mongoose";

const NoticeSchema = Schema(
	{
		
		title: {
			type: String,
			required : "Notice Title is required."
		},
		
		text: {
			type : String,
			required : "Notice Text is required",
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

const Notice = model("Notice", NoticeSchema);

export default Notice;