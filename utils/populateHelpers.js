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
