export default class MaxNumberOfCheckInsError extends Error {
	constructor() {
		super('Max number check ins reached');
	}
}
