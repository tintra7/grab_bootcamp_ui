import axios from 'axios'

import { apiRoomUrl } from '@/constants/serverConfig'

export default async function getRoomList() {
  try {
    const response = await axios.get(
      `${apiRoomUrl}?userId=664222c864e4a690113f5f84`
    )
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
