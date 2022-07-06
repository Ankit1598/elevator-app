import { useEffect } from 'react';
import { useRfidStore } from "store/rfid.store";

const RfidListeners = () => {
	const dispatchToRfid = useRfidStore(state => state.dispatchToRfid)
	const rfidSocket = useRfidStore(state => state.rfidSocket)

	const rfidSocketJoined = () => {
		console.debug("@rfidSocket Joined");
		dispatchToRfid({ type: 'SOCKET_JOINED' })
	};

	const rfidSocketError = () => {
		console.error("@rfidSocket ERROR");
		dispatchToRfid({ type: 'SOCKET_ERROR' })
	};

	const rfidSocketDisconnect = () => {
		console.debug("@rfidSocket Disconnected");
		dispatchToRfid({ type: 'SOCKET_DISCONNECT' })
	};

	const rfidSocketRfidData = ({ data }) => {
		console.debug("@rfidSocket.on('data'):", data);
		dispatchToRfid({ type: 'SET_RFID_DATA', payload: data })
	};

	useEffect(() => {
			rfidSocket.onopen = rfidSocketJoined;
			rfidSocket.onerror = rfidSocketError;
			rfidSocket.onclose = rfidSocketDisconnect;
			rfidSocket.onmessage = rfidSocketRfidData;

			return () => rfidSocket.close();
	}, [])

	return <></>

}

export default RfidListeners