export function trimString(str: string) {
	return str.split(' ').join('').toLocaleLowerCase();
}
