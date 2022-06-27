const connectSocket = () =>
	new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET}`)

export default connectSocket
export { default as EventListeners } from './Listeners';
