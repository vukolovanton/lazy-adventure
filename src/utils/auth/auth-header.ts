export default function authHeader() {
    const token = localStorage.getItem('token');

    if (token) {
		let parsedToken = JSON.parse(token);

        if (parsedToken) {
            return { Authorization: 'Bearer ' + parsedToken };
		}

		return { Authorization: 'Bearer ' + '' };
	}

	return { Authorization: 'Bearer ' + '' };
}
