import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

import { STATUS } from '@/constants/enum'

import '@/assets/css/components/FanList/FanPowerButtonGroup.css'

interface FanPowerButtonGroupProp {
    status: STATUS
    onClick: () => void
}

const FanPowerButtonGroup = ({
    status,
    onClick
  }: FanPowerButtonGroupProp): JSX.Element => {
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
  
  export default FanPowerButtonGroup