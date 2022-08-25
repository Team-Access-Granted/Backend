const errorMiddleware = (err, req, res, next) => {
	
	let { status = 500, message = "Internal Server Error"} = err;
  
	res.status(status).json({
		error: true,
		message: message
	});
	
};

export default errorMiddleware;
  