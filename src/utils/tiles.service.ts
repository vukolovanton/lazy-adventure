import { TilesSources } from '@/interfaces/TilesEditorInterfaces';
import axios from 'axios';
import authHeader from './auth/auth-header';

const API_URL = 'http://localhost:3001/api/v1/';

class TilesService {
	saveTile(tileset: File) {
		const formData = new FormData();
		formData.append('file', tileset);

		return axios.post(API_URL + 'files', formData, {
			headers: {
				...authHeader(),
				'Content-Type': 'multipart/form-data',
				'X-File-Name': 'Somebodyoncetoldme',
			},
		});
	}

	fetchAllAvailableileTiles(): Promise<TilesSources[]> {
		return axios
			.get(API_URL + 'files', {
				headers: authHeader(),
			})
			.then((response) => {
				return response.data;
			});
	}

	// fetchPlayer(id: string): Promise<Player> {
	// 	return axios
	// 		.get(API_URL + 'player/' + id, { headers: authHeader() })
	// 		.then((response) => response.data)
	// 		.catch((e) => alert(e));
	// }
}

export default new TilesService();
