export const getUpdateFields = (data) => {
	
	let updateFields = {}

	Object.entries(data).forEach(([key,value]) => {
		if(value){
			updateFields[key] = value;
		}
	})
	
	return updateFields;
	
}