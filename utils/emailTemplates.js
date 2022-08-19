export function requestPasswordTemplate(name, link) {
	return (
		`<h3>Hi ${name.toUpperCase()}</h3>
		<p>You have requested to reset your password.</p>
		<p>Kindly click on the link below to reset your password.</p>
		<p>If you did not perform this action, please ignore this meassage.</p>
		<a href="${link}">Reset Password</a>`
	);
}

export function welcomeTemplate(name, link) {
	return (
		`<h3>Welcome ${name.toUpperCase()}</h3>
		<p>We are glad to have you at Spider Bug Tracker.</p>
		<p>There is one last thing we need before you can get started.</p>
		<a href="${link}">Verify Email</a>
		<p>Enjoy your stay here.</p>`
	);
}

export function activationTemplate(name) {
	return (
		`<h3>Welcome ${name.toUpperCase()}</h3>
		<p>We are glad to have you at Spider Bug Tracker.</p>
		<p>Your account has already been activated. You can now login.</p>
		<p>Enjoy your stay here.</p>`
	);
}

export function resetPasswordTemplate(name) {
	return (
		`<h3>Hi ${name.toUpperCase()}</h3>
		<p>Your password has been successfully reset.</p>
		<p>Thank you for your patience.</p>`
	);
}

export function addBugTemplate(name, project, link) {
	return (
		`<h3>Hi ${name.toUpperCase()}</h3>
		<p>A new bug has been created in your project ${project}.</p>
		<p>Check it out <a href="${link}">here and assign it in no time.</a></p>
		<p>Have a great time debugging.</p>`
	);
}

export function assignBugTemplate(name, project, link) {
	return (
		`<h3>Hi ${name.toUpperCase()}</h3>
		<p>A new bug has been assigned to you in the project ${project}.</p>
		<p>Check it out <a href="${link}">here.</a></p>
		<p>Have a great time debugging.</p>`
	);
}
