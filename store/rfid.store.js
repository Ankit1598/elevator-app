import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { rfidReducer } from './rfid.reducer'

export const useRfidStore = create(
	devtools(
		(set) => ({
			rfidSocket: null,
			rfidData: '',
			dispatchToRfid: (action) =>
				set((state) => rfidReducer(state, action)),
		}),
		{ name: "useRfidStore" }
	)
);