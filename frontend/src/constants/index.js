export const API_BASE =
	process.env.NODE_ENV === 'development' ? `//${location.hostname}:4001` : ''
