import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { rfidReducer } from './rfid.reducer'

export const useRfidStore = create(
	devtools(
		(set) => ({
			rfidSocket: { socket: null, connected: false, error: false },
			rfidData: null,
			dispatchToRfid: (action) =>
				set((state) => rfidReducer(state, action)),
		}),
		{ name: 'useStore' }
	)
)