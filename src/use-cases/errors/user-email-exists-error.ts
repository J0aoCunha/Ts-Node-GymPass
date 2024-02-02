export class UserEmailExistsError extends Error {
	constructor() {
		super('E-mail ja cadastrado');
	}
}