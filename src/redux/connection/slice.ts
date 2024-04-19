import { HubConnection } from "@microsoft/signalr";
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '../action'

export interface ConnectionChatState {
  connection: HubConnection | null;
}

const initialState: ConnectionChatState = {
  connection: null,
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<HubConnection>) => {
      state.connection = action.payload;
    },
    clearConnection: (state) => {
      state.connection = null;
    }
  },
});

export const { setConnection, clearConnection } = connectionSlice.actions;
export default connectionSlice.reducer;