import { useEffect, useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import Grid from '@mui/material/Grid'

import { STATUS } from '@/constants/enum'
import { IFan } from '@/models/entities/fanModel'
import getFanList from '@/services/servicesFan/getFanList'
import { errorAlert, loading } from '@/utils/sweetAlert'
import FanCardOff from './FanCardOff'
import FanCardOn from './FanCardOn'

import '@/assets/css/components/FanList/FanList.css'

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
        Swal.fire(errorAlert('Failed to get fan list !') as SweetAlertOptions)
      )
  }, [])

  return (
    <div className='fans-container'>
      <Grid container spacing={2}>
        {fanList.map((fan) => (
          <Grid item xs={12} sm={4}>
            {fan.status == STATUS.ON ? (
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
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default FanList
