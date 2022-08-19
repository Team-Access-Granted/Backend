import { Schema, model } from 'mongoose';
import validator from 'validator';
import { uploadFile, deleteFile } from '../utils/firebaseUtils';

const FileSchema = Schema(
	{
		
		name: {
			type: String,
			trim : true
		},
		
		url : {
			type : String,
			trim : true,
			validate: {
				validator: (value) => validator.isURL(value),
				message: "File URL is invalid."
			}
		}
		
	},
	{
		timestamps: true
	}
)

FileSchema.pre('deleteOne', { document: true, query: false }, async function(next){
    await this.delete()
    next()
})

FileSchema.methods = {
	
	upload: async function(file, fileName, folderName){
		this.name = `${folderName}/${fileName}`;
		this.url = await uploadFile(file, `${folderName}/${fileName}`)
	},
	
    delete: async function(){
		await deleteFile(this.name);
    }
	
}

const File = model("File",FileSchema)

export default File;