import { produce } from 'immer'

export const rfidReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_SOCKET':
			return produce(state, draft => {
				draft.rfidSocket = payload
			})
		case 'SOCKET_ERROR':
		case 'SOCKET_FAILED':
			return produce(state, (draft) => {
				draft.rfidSocket.error = true
			})
		case 'SOCKET_DISCONNECT':
			return produce(state, (draft) => {
				draft.rfidSocket.connected = false
			})
		case 'SOCKET_JOINED':
			return produce(state, (draft) => {
				draft.rfidSocket.connected = true
			})
		case 'SET_RFID_DATA': 
			return produce(state, draft => {
				draft.rfidData = payload
			})
	}
}