export const userPopulate = [
	{
		path: 'resume',
		select: 'name url'
	},
	{
		path: 'profilePhoto',
		select: 'name url'
	},
	{
		path: 'company',
		select: 'name'
	},
	{
		path: 'university',
		select: 'name'
	}
]

export const postingPopulate = [
	{
		path: 'company',
		select: 'name'
	},
	{
		path: 'university',
		select: 'name'
	}
]

export const applicationPopulate = [
	{
		path: 'posting',
		select: 'title status',
		populate: postingPopulate
	},
	{
		path: 'student',
		select: 'name'
	}
]

export const requestPopulate = [
	{
		path: 'author',
		select: 'name'
	},
	{
		path: 'company',
		select: 'name'
	},
	{
		path: 'university',
		select: 'name'
	}
]