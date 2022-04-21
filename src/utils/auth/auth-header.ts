export default function authHeader() {
	const userItem = localStorage.getItem('user');

	if (userItem) {
		let user = JSON.parse(userItem);

		if (user && user.token) {
			return { Authorization: 'Bearer ' + user.token };
		}

		return { Authorization: 'Bearer ' + '' };
	}

	return { Authorization: 'Bearer ' + '' };
}
