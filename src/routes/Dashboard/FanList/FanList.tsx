import { useEffect, useState } from 'react'

import FanCardOn from './FanCardOn'
import FanCardOff from './FanCardOff'

import '@/assets/css/components/FanList/FanList.css'

import { IFan } from '@/models/entities/fanModel'
import getFanList from '@/services/servicesFan/getFanList'

import Swal, { SweetAlertOptions } from 'sweetalert2'
import { loading, errorAlert } from '@/utils/sweetAlert'
import { STATUS } from '@/constants/enum'

const FanList: React.FC = () => {
  const [fanList, setFanList] = useState<IFan[]>([])

  const updateFanList = (fan: IFan) => {
    const newFanList = fanList.map((d) => {
      if (d._id == fan._id) return fan
      else return d
    })

    setFanList(newFanList)
  }

  useEffect(() => {
    Swal.fire(loading)
    getFanList()
      .then((fans) => {
        Swal.close()
        setFanList(fans)
      })
      .catch(() =>
        Swal.fire(
          errorAlert('Failed to get fan list !') as SweetAlertOptions
        )
      )
  }, [])

  return (
    <div className='fans-container'>
      {fanList.map((fan) =>
        fan.status == STATUS.ON ? (
          <FanCardOn
            key={fan._id}
            fan={fan}
            updateFanList={updateFanList}
          />
        ) : (
          <FanCardOff
            key={fan._id}
            fan={fan}
            updateFanList={updateFanList}
          />
        )
      )}
    </div>
  )
}

export default FanList