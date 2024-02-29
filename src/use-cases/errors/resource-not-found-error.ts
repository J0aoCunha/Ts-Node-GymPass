export default class ResourceNotFoundError extends Error {
	constructor() {
		super('Source not found!');
	}
}
