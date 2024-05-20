import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface RoomState {
  _id: string
  sensorId: string
}

const initialState: RoomState = {
  _id: '',
  sensorId: ''
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom: (state, action: PayloadAction<RoomState>) => {
      state._id = action.payload._id
      state.sensorId = action.payload.sensorId
    },
    clearRoom: (state) => {
      state._id = ''
      state.sensorId = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateRoom, clearRoom } = roomSlice.actions

export default roomSlice.reducer
