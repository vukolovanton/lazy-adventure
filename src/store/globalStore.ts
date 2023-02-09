import { StoreIds } from '@/constants';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore(StoreIds.GlobalStore, {
	state: () => ({
		isEditable: false,
		user: {
			email: '',
			avatarSource: '',
            userId: '',
		},
		isLoading: false,
		isSuccess: Date.now(),
		successMessage: '',
	}),

	actions: {
		setIsEditable(value: boolean) {
			this.isEditable = value;
		},
		setEmail(value: string) {
			this.user.email = value;
		},
		setUserId(value: string) {
			this.user.id = value;
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
		setAvatarSource(value: string) {
			this.user.avatarSource = value;
		},
		setIsSuccess(message?: string) {
			if (message) {
				this.successMessage = message;
			}
			this.isSuccess = Date.now();
		},
		setSuccessMessage(message: string) {
			this.successMessage = message;
		},
	},
	persist: true,
});
