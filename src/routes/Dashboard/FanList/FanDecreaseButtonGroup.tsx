import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import { FANSPEEDFORFAN } from '@/constants/enum'

import '@/assets/css/components/FanList/FanPowerButtonGroup.css'

interface FanDecreaseButtonGroupProp {
    fanSpeed:  FANSPEEDFORFAN
    onClick: () => void
}

const FanDecreaseButtonGroup = ({
    onClick
  }: FanDecreaseButtonGroupProp): JSX.Element => {
    return (
      <div className='power-button-group'>
        <div
          onClick={onClick}
          className={`power-button off`}
        >
          <ArrowCircleDownIcon className='power-icon' />
          <span>DECREASE</span>
        </div>
      </div>
    )
  }
  
  export default FanDecreaseButtonGroup