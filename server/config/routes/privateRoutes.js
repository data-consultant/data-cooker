const privateRoutes = {
	'GET /avatars': 'UserController/avatar.getAvatars',
	'GET /avatars/:id': 'UserController/avatar.getAvatar',

	'GET /roles': 'UserController/role.getRoles',
	'GET /roles/:id': 'UserController/role.getRole',

	'GET /users': 'UserController/user.getUsers',
	'GET /users/:id': 'UserController/user.getUser',
	'POST /users': 'UserController/user.postUser',
	'PUT /users/:id': 'UserController/user.postUser',
	'DELETE /users': 'UserController/user.deleteUsers',
	'DELETE /users/:id': 'UserController/user.deleteUser',

	'GET /permissions': 'UserController/permission.getPermissions',
	'GET /permissions/:id': 'UserController/permission.getPermission',

	'GET /courses': 'UserController/course.getCourses',
	'GET /courses/:id': 'UserController/course.getCourse',
	'POST /courses': 'UserController/course.postCourse',
	'PUT /courses/:id': 'UserController/course.postCourse',
	'DELETE /courses': 'UserController/course.deleteCourses',
	'DELETE /courses/:id': 'UserController/course.deleteCourse',

	'GET /notes': 'UserController/note.getNotes',
	'GET /notes/:id': 'UserController/note.getNote',
	'POST /notes': 'UserController/note.postNote',
	'PUT /notes/:id': 'UserController/note.postNote',
	'DELETE /notes': 'UserController/note.deleteNotes',
	'DELETE /notes/:id': 'UserController/note.deleteNote',


	'GET /jobs': 'TaskController/job.getJobs',
	'GET /jobs/:id': 'TaskController/job.getJob',
	'POST /jobs': 'TaskController/job.postJob',
	'PUT /jobs/:id': 'TaskController/job.postJob',
	'DELETE /jobs': 'TaskController/job.deleteJobs',
	'DELETE /jobs/:id': 'TaskController/job.deleteJob',

	'GET /tasks': 'TaskController/task.getTasks',
	'GET /tasks/:id': 'TaskController/task.getTask',
	'POST /tasks': 'TaskController/task.postTask',
	'PUT /tasks/:id': 'TaskController/task.postTask',
	'DELETE /tasks': 'TaskController/task.deleteTasks',
	'DELETE /tasks/:id': 'TaskController/task.deleteTask',


	'GET /targets': 'AggController/target.getTargets',
	'GET /targets/:id': 'AggController/target.getTarget',
	'POST /targets': 'AggController/target.postTarget',
	'PUT /targets/:id': 'AggController/target.postTarget',
	'DELETE /targets': 'AggController/target.deleteTargets',
	'DELETE /targets/:id': 'AggController/target.deleteTarget',

	'GET /sources': 'AggController/source.getSources',
	'GET /sources/:id': 'AggController/source.getSource',
	'POST /sources': 'AggController/source.postSource',
	'PUT /sources/:id': 'AggController/source.postSource',
	'DELETE /sources': 'AggController/source.deleteSources',
	'DELETE /sources/:id': 'AggController/source.deleteSource',
};

module.exports = privateRoutes;
