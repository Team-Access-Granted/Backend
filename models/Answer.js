import { Schema, model } from 'mongoose';

const AnswerSchema = Schema({
	author: {
		type: Schema.Types.ObjectId, 
        ref: 'User'
	},
    text: {
        type : String,
		validate: {
			validator: function(value){
				return (value && value.length > 0)
			},
			message: "Answer cant be empty." 
		},
        required : "Answer text is required."
    },
	likes: [
		{
			type: Schema.Types.ObjectId, 
        	ref: 'User'
		}
	],
	questionId: {
		type: Schema.Types.ObjectId, 
        ref: 'Question'
	},
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

AnswerSchema.methods = {

	isAuthor: function(id){
		return this.author.toString() == id.toString();
	},
	hasLike : function(id){
		return this.likes.includes(id);
	},
	addLike : function(id){
		if(!this.hasLike(id)){
			this.likes.push(id);
		}
	},
	removeLike : function(id){
		this.likes = this.likes.filter(e => e._id.toString() !== id.toString())
	},
	setText : function(text){
		if(text && text.length > 0){
			this.text = text
		}
	}
	
}

export default model("Answer",AnswerSchema)