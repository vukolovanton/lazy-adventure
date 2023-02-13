import { TilesSources } from '@/interfaces/TilesEditorInterfaces';
import axios from 'axios';
import { handleError } from 'vue';
import authHeader from './auth/auth-header';
import { errorHandler } from './utils';
import {GLOBAL_API_URL} from "@/constants";

class TilesService {
	saveTile(tileset: File) {
		const formData = new FormData();
		formData.append('file', tileset);

		return axios.post(GLOBAL_API_URL + '/files/upload', formData, {
			headers: {
				...authHeader(),
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	fetchAllAvailableileTiles(): Promise<any> {
		return axios
			.get(GLOBAL_API_URL + '/files/list', {
				headers: authHeader(),
			})
			.then((response) => {
				return response.data;
			})
			.catch(errorHandler);
	}
//
//	fetchMonstersList(): Promise<TilesSources[]> {
//		return axios
//			.get(API_URL + 'files/monsters', {
//				headers: authHeader(),
//			})
//			.then((response) => {
//				return response.data;
//			})
//			.catch(errorHandler);
//	}
}

export default new TilesService();
