import { useEffect } from 'react';
import { useRfidEmitter } from 'sockets/Emitters';
import { useRfidStore } from "store/rfid.store";

const RfidListeners = () => {
	const dispatchToClass = useRfidStore(state => state.dispatchToRfid)
	const { joinRfidSocket } = useRfidEmitter()

	const rfidSocketConnect = () => {
		console.debug("@rfidSocket Connected");
	};


	const rfidSocketIoReconnect = (attempt) => {
		console.debug("@rfidSocket reconnect", attempt);
		joinRfidSocket();
	};

	const rfidSocketIoReconnectAttempt = (attempt) => {
		console.debug("@rfidSocket reconnect_attempt", attempt);
	};

	const rfidSocketIoReconnectError = (error) => {
		console.debug("@rfidSocket reconnect_error", error.message);
	};

	const rfidSocketIoReconnectFailed = () => {
		console.debug("@rfidSocket reconnect_failed");
		dispatchToSocket({ type: 'SOCKET_FAILED', payload: { socketType: 'rfidSocket' } })
		closeClass("rfidSocketError");
	};

	const rfidSocketDisconnect = (reason) => {
		console.debug("@rfidSocket Disconnected: ", reason);
		dispatchToSocket({ type: 'SOCKET_DISCONNECT', payload: { socketType: 'rfidSocket' } })
	};

	const rfidSocketError = (data) => {
		console.error("@rfidSocket ERROR: ", data);
		dispatchToSocket({ type: 'SOCKET_ERROR', payload: { socketType: 'rfidSocket' } })
		closeClass("rfidSocketError");
	};

	const rfidSocketJoined = (data) => {
		console.debug("@rfidSocket Joined: ", data);
		dispatchToSocket({ type: 'SOCKET_JOINED', payload: { socketType: 'rfidSocket' } })
	};

	const rfidSocketRfidData = ({ rfidData }) => {
		console.debug("@rfidSocket.on('rfidData'):", rfidData); //{ rfidData, roomId}
		dispatchToClass({ type: 'SET_RFID_DATA', payload: rfidData })
	};

	useEffect(() => {
		rfidSocket.on("connect", rfidSocketConnect);
		rfidSocket.io.on("reconnect", rfidSocketIoReconnect);
		rfidSocket.io.on("reconnect_attempt", rfidSocketIoReconnectAttempt);
		rfidSocket.io.on("reconnect_error", rfidSocketIoReconnectError);
		rfidSocket.io.on("reconnect_failed", rfidSocketIoReconnectFailed);
		rfidSocket.on("disconnect", rfidSocketDisconnect);
		rfidSocket.on("error", rfidSocketError);
		rfidSocket.on("joined", rfidSocketJoined);
		rfidSocket.on("rfidData", rfidSocketRfidData);

		return () => {
			rfidSocket.off("connect", rfidSocketConnect);
			rfidSocket.io.off("reconnect", rfidSocketIoReconnect);
			rfidSocket.io.off("reconnect_attempt", rfidSocketIoReconnectAttempt);
			rfidSocket.io.off("reconnect_error", rfidSocketIoReconnectError);
			rfidSocket.io.off("reconnect_failed", rfidSocketIoReconnectFailed);
			rfidSocket.off("disconnect", rfidSocketDisconnect);
			rfidSocket.off("error", rfidSocketError);
			rfidSocket.off("joined", rfidSocketJoined);
			rfidSocket.off("rfidData", rfidSocketRfidData);
		};
	}, [])

	return <></>

}

export default RfidListeners