const errorMiddleware = (err, req, res, next) => {
	
	let { statusCode = 500, message = "Internal Server Error"} = err;
  
	res.status(statusCode).json({
		error: true,
		message: message
	});
	
};

export default errorMiddleware;
  