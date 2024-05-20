import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface RoomState {
  _id: string
}

const initialState: RoomState = {
  _id: ''
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom: (state, action: PayloadAction<RoomState>) => {
      state._id = action.payload._id
    },
    clearRoom: (state) => {
      state._id = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateRoom, clearRoom } = roomSlice.actions

export default roomSlice.reducer
