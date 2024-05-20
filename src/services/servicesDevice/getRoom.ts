import axios from 'axios'

import { apiRoomUrl } from '@/constants/serverConfig'

export default async function getRoom(roomId: string) {
  try {
    const response = await axios.get(`${apiRoomUrl}/${roomId}`)
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
