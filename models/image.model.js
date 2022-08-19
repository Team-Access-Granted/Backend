import { Schema, model } from 'mongoose';
import { uploadImage, deleteImage } from '../utils/singleImageOperations';

const ImageSchema = Schema(
	{
		
		public_id : {
			type : String,
			trim : true,
			unique : true,
			required : true
		},
		
		url : {
			type : String,
			trim : true,
			required : true,
			validate: {
				validator: (value) => validator.isURL(value),
				message: "Image URL is invalid."
			}
		},
		
		parent_id : {
			type: Schema.Types.ObjectId, 
			required: true,
		},
		
		parent_model : {
			type : String,
			required : true
		}
		
	},
	{
		timestamps: true
	}
)

ImageSchema.pre('deleteOne', { document: true, query: false }, async function(next){
    let response = await this.delete()
    if(response){
        next()
    }else{
        let err = new Error('Could not delete image.');
        next(err)
    }
})

ImageSchema.methods = {
    upload: async function(id,image,type){
        this.parent_id = id
        this.parent_model = type
        let self = this
        return uploadImage(image,type)
        .then(({url,public_id}) => {
            self.url = url,
            self.public_id = public_id
            return self._id
        })
        .catch(() => null)
    },
    delete: async function(){
        return deleteImage(this.public_id)
        .then(({result}) => {
            if(result == 'ok'){
                return true
            }
            return false
        })
        .catch(() => false)
    }
}

const Image = model("Image",ImageSchema)

export default Image;