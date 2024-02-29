export class InvalidCredentialsError extends Error {
	constructor() {
		super('credentials incorrectly');
	}
}
