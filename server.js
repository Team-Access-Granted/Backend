import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth.router';
import universityRouter from './routes/university.router';
import companyRouter from './routes/company.router';
import postingRouter from './routes/posting.router';
import applicationRouter from './routes/application.router';
import errorMiddleware from './middleware/error.middleware.js';
import multer from './config/multer.config'
import { uploadProfilePhoto } from './utils/firebaseUtils';
import Student from './models/student.model';
import { studentPopulate } from './utils/populateHelpers';

dotenv.config();

const port = process.env.PORT || 5000
const mongo_url = process.env.MONGO_URL
const frontendURL = process.env.FRONTEND_URL
const path = '/api/v1'

const app = express();

mongoose.connect(mongo_url, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	autoIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cookieParser());
app.use(cors({
    origin : '*'
}))

app.use(`${path}/auth`, authRouter);
app.use(`${path}/universities`, universityRouter);
app.use(`${path}/companies`, companyRouter);
app.use(`${path}/postings`, postingRouter);
app.use(`${path}/applications`, applicationRouter)

app.get('', multer.fields([
	{
		name: 'profilePhoto', maxCount: 1
  	}, {
		name: 'resume', maxCount: 1
  	}
]),	async (req,res) => {
	
	const student = await Student.findOne({ email : "vrajparikh@gmail.com"})
		.populate(studentPopulate)
	
	await student.addResume(req.files.resume[0])
	await student.addProfilePhoto(req.files.profilePhoto[0])
	
	await student.save()
	
	res.status(200).json(await Student.populate(student, studentPopulate))
})

app.use(errorMiddleware)

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
});




