import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
	state: () => ({
		isEditable: false,
		user: {
			username: '',
			id: '',
		},
		isLoading: false,
	}),

	actions: {
		setIsEditable(value: boolean) {
			this.isEditable = value;
		},
		setUsername(value: string) {
			this.user.username = value;
		},
		setUserId(value: string) {
			this.user.id = value;
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
	},
});
