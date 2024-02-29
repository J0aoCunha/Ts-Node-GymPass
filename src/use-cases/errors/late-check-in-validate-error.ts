export default class LateCheckInValidateError extends Error {
	constructor() {
		super('The check-in can only be validate until 20 minuto of it creation.');
	}
}
