import { useEffect } from "react";
import { useRfidStore } from "store/rfid.store";

const RfidListeners = () => {
	const dispatchToRfid = useRfidStore((state) => state.dispatchToRfid);
	const rfidSocket = useRfidStore((state) => state.rfidSocket);

	const rfidSocketJoined = (e) => {
		console.debug("@rfidSocket Joined", e);
		dispatchToRfid({ type: "SOCKET_JOINED" });
	};

	const rfidSocketError = (e) => {
		console.error("@rfidSocket ERROR", e);
		dispatchToRfid({ type: "SOCKET_ERROR" });
	};

	const rfidSocketDisconnect = (e) => {
		console.debug("@rfidSocket Disconnected", e);
		dispatchToRfid({ type: "SOCKET_DISCONNECT" });
	};

	const rfidSocketRfidData = ({ data }) => {
		console.debug("@rfidSocket.on('data'):", data);
		dispatchToRfid({ type: "SET_RFID_DATA", payload: data });
	};

	useEffect(() => {
		rfidSocket.onopen = rfidSocketJoined;
		rfidSocket.onerror = rfidSocketError;
		rfidSocket.onclose = rfidSocketDisconnect;
		rfidSocket.onmessage = rfidSocketRfidData;
	}, []);

	return <></>;
};

export default RfidListeners;
