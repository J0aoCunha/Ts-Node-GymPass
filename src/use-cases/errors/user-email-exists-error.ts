class UserEmailExistsError extends Error {
	constructor() {
		super();
		this.message =  'User Email Exists';
	}
}

export default new UserEmailExistsError();