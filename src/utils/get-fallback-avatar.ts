export function getFallbackAvatar(username: string) {
	return username
		.split(' ')
		.map(name => name.charAt(0))
		.slice(0, 2)
		.join('')
		.toUpperCase();
}