import { reactive, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { io, Socket } from 'socket.io-client';
import { storeToRefs } from 'pinia';
import { useCharacterMainInfo } from '@/store/palyerStats/characterMainInfoStore';
import { SOCKET_IO_URL, SOCKET_IO_ROOM_NAME } from '@/constants';

export function useSocket(context: any) {
	const playerBaseInfoStore = useCharacterMainInfo();
	const { characterName } = storeToRefs(playerBaseInfoStore);

	const state = reactive({
		socket: {} as Socket,
		context: {},
		position: {
			x: 0,
			y: 0,
		},
		users: [],
	});

	function move(direction: any) {
		state.socket.emit('move', direction);
	}

	onBeforeMount(() => {
		state.socket = io(SOCKET_IO_URL);
	});

	// == Join Room
	state.socket.emit('joinRoom', {
		characterName: characterName.value,
		room: SOCKET_IO_ROOM_NAME,
	});

	state.socket.on('joined', (response) => {
		state.users = response.data;
	});

	state.socket.on('left', (response) => {
		state.users = response.data;
	});
	// ==

	state.context = context;

	state.socket.on('position', (position) => {
		state.position = position;
		state.context.clearRect(0, 0, 480, 480);
		state.context.fillRect(state.position.x, state.position.y, 32, 32);
	});

	onUnmounted(() => {
		state.socket.emit('leaveRoom', {
			characterName: characterName.value,
			room: SOCKET_IO_ROOM_NAME,
		});
		state.socket.close();
	});

	return {
		state,
		move,
	};
}
