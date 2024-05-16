import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

import { STATUS } from '@/constants/enum'

import '@/assets/css/components/DeviceList/PowerButtonGroup.css'

interface PowerButtonGroupProp {
  status: STATUS
  onClick: () => void
}

const PowerButtonGroup = ({
  status,
  onClick
}: PowerButtonGroupProp): JSX.Element => {
  return (
    <div className='power-button-group'>
      <div
        onClick={onClick}
        className={`power-button button ${status == STATUS.ON ? 'on' : 'off'}`}
      >
        <PowerSettingsNewIcon className='power-icon' />
        <span>{status == STATUS.ON ? 'TURN OFF' : 'TURN ON'}</span>
      </div>
    </div>
  )
}

export default PowerButtonGroup
