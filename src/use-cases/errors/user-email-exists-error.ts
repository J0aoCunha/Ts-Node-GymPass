export default class UserEmailExistsError extends Error {
	constructor() {
		super('User Email Exists');
	}
}
