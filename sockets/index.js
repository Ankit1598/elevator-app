import io from "socket.io-client";

const connectSocket = () =>
	io(`${process.env.NEXT_PUBLIC_SOCKET}`, {
		reconnection: true,
		reconnectionDelay: 1000,
		reconnectionAttempts: 5,
	})

export default connectSocket
export { default as EventListeners } from './Listeners';
