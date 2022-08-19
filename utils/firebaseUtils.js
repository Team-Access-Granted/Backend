import bucket from '../config/firebase.config'
import { HttpException } from '../exceptions/HttpException';

export const uploadFile = async (file, fileName) => {
	try {

		return await ( 
			new Promise((resolve, reject) => {
		
				const blob = bucket.file(fileName);
				
				const blobWriter = blob.createWriteStream({
					metadata: {
						contentType: file.mimetype
					}
				});

				blobWriter.on('error', (error) => {
					reject('Could not upload attached files.');
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
		)
		
	}catch(error) {
		throw new HttpException(400, "Could not upload files.")
	}
}

export const deleteFile = async (fileName) => {
	
	try{
		
		await bucket.file(fileName).delete()
		
	}catch(error){
		
		throw new HttpException(400, "Could not delete files")
	}
	
}