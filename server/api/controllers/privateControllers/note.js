const { validationResult } = require('express-validator');
const { Note, User } = require('../../models');

const NoteController = () => {
	const getNotes = async (req, res, next) => {
		// Find all notes
		Note.findAll({
			// This is all the note data
			attributes: ['id', 'note', 'userId'],
			include: [{
				// this is the user data associated with each note
				model: User,
				attributes: ['id', 'userName', 'firstName', 'lastName', 'email'],
			}],
		}).then((notes) => {
			res.status(200);
			// retrieve notes in JSON format
			res.json({ notes });
		})
			// Catch the errors
			.catch((err) => {
				err.status = 400;
				next(err);
			});
	};

	const getNote = async (req, res, next) => {
		// get note
		Note.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ['id', 'note', 'userId'],
			include: [{
				model: User,
				attributes: ['id', 'userName', 'firstName', 'lastName', 'email'],
			}],
		}).then((note) => {
			// Checks for match for note
			if (note) {
				res.status(200);
				res.json({
					note
				});
			} else {
				const err = new Error('This note does not exist.');
				err.status = 404;
				next(err);
			}
		});
	};

	const postNote = async (req, res, next) => {
		if (!req.body.note && !req.body.description) {
			const err = new Error('Please enter a note and a description.');
			err.status = 400;
			next(err);
		} else if (!req.body.note) {
			const err = new Error('Please enter a note.');
			err.status = 400;
			next(err);
		} else if (!req.body.description) {
			const err = new Error('Please enter a description.');
			err.status = 400;
			next(err);
		} else {
			Note.findOne({
				where: {
					note: req.body.note
				}
			}).then((note) => {
				if (note) {
					const err = new Error('This note already exists.');
					err.status = 400;
					next(err);
				} else {
					Note.create(req.body).then(note => {
						res.location(`/respful/notes/${note.id}`);
						res.status(201).end();
					})
						// Catch errors
						.catch((err) => {
							err.status = 400;
							next(err);
						});
				}
			})
		}
	};


	const putNote = async (req, res, next) => {
		const user = req.currentUser;
		// If note is left null
		if (!req.body.note && !req.body.description) {
			const err = new Error('Please enter a note and a description.');
			err.status = 400;
			next(err);
		} else if (!req.body.note) {
			const err = new Error('Please enter a note.');
			err.status = 400;
			next(err);
		} else if (!req.body.description) {
			const err = new Error('Please enter a description.');
			err.status = 400;
			next(err);
		} else {
			Note.findOne({
				where: {
					id: req.body.id
				}
			}).then((note) => {
				if (!note) {
					res.status(404).json({
						message: 'Note Not Found'
					});
				} else if (note) {
					if (user.id === note.userId) {
						const updateNote = {
							id: req.body.id,
							note: req.body.note,
							userId: req.currentUser.id,
						};
						note.update(req.body);
					} else {
						res.location('/').status(403).json('You do not have permissions to update this note');
					}
				}
			}).then(() => {
				res.status(204).end();
			})
				// Catch any errors
				.catch((err) => {
					err.status = 400;
					next(err);
				});
		}
	};

	const deleteNotes= async (req, res, next) => {
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// delete user from users table
		Note.destroy({
			where: filter,
		}).then((deleted) => {
			res.status(204).end(deleted);
		});
	};

	const deleteNote = async (req, res, next) => {
		const user = req.currentUser;
		// Find one note to delete
		Note.findOne({
			where: {
				id: req.params.id
			}
		}).then((note) => {
			// If note doesn't exist
			if (!note) {
				// Show error
				res.status(404).json({
					message: 'Note Not Found'
				});
			} else if (user.id === note.userId) {
				// Delete the note
				return note.destroy();
			} else {
				res.location('/').status(403).json('You do not have permissions to delete this note');
			}
		}).then(() => {
			// Return no content and end the request
			res.status(204).end();
		})
			// Catch the errors
			.catch((err) => {
				err.status = 400;
				next(err);
			});
	};

	return {
		getNotes,
		getNote,
		postNote,
		putNote,
		deleteNotes,
		deleteNote,
	};
};

module.exports = NoteController;

