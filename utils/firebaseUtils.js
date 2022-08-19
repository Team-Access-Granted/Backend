import bucket from '../config/firebase.config'
import { HttpException } from '../exceptions/HttpException';

const uploadFile = async (file, folder) => new Promise((resolve, reject) => {
	
	const blob = bucket.file(`${folder}/${file.originalname}`);
	
	const blobWriter = blob.createWriteStream({
		metadata: {
			contentType: file.mimetype
		}
	});

	blobWriter.on('error', (error) => {
	  console.log("error in uploading is" , error)
		reject('Something is wrong! Unable to upload at the moment.');
	});

	blobWriter.on('finish', async () => {
		
		const urls = await blob.getSignedUrl({
			action: 'read',
			expires: '03-09-2491'
		})
		
		resolve(urls[0]);
		
	});

	blobWriter.end(file.buffer);
})

export const uploadProfilePhoto = async (file) => {
	try{
		
		const url = await uploadFile(file,"Profile Photos")
		return url;
		
	}catch(error){
		throw new HttpException(400, "Could not upload profile photo.")
	}
}

export const uploadResume = async (file) => {
	try{
		
		const url = await uploadFile(file,"Resumes")
		return url;
		
	}catch(error){
		throw new HttpException(400, "Could not upload resume.")
	}
}