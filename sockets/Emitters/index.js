import { useRfidStore } from "store/rfid.store";

const useRfidEmitter = () => {
	const rfidSocket = useRfidStore(state => state.rfidSocket.socket)

	const joinRfidSocket = () => {
		rfidSocket.emit("join");
		console.debug('RfidSocket.emit("join")');
	};


	return { joinRfidSocket }
}

export default useRfidEmitter