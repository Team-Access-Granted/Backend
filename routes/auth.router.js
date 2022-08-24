import { Router } from 'express';
import { registerAsStudent, registerAsCompanyAdmin, loginAsUser, registerAsUniversityAdmin } from '../controllers/auth.controller';
import passport from '../config/passport.config';

const router = Router();

router.post('/students/register',
    registerAsStudent
)

router.post('/companies/register',
    registerAsCompanyAdmin
)

router.post('/universities/register',
	registerAsUniversityAdmin
)

router.post('/login',
    loginAsUser
)  

// router.route('/user')
//     .get(
//         passport.authenticate('user', {session : false}),
//         getUser
//     )
//     .patch(
//         authenticate('user', {session : false}),
//         updateUser
//     )

// router.route('/user/password')
//     .post(forgotPassword)
//     .patch(changePassword)

export default router;