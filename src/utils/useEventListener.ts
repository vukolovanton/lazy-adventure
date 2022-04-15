import { onUnmounted } from 'vue';

export function useEventListener(
	selector: string,
	event: any,
	callback: (event: MouseEvent) => void
) {
	const target = document.querySelector(selector);

	if (target) {
		target.addEventListener(event, callback);
	}

	onUnmounted(() => {
		if (target) {
			target.removeEventListener(event, callback);
		}
	});
}
