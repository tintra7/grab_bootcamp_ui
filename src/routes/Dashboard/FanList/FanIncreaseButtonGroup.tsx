import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { FANSPEEDFORFAN } from '@/constants/enum'

import '@/assets/css/components/FanList/FanPowerButtonGroup.css'

interface FanIncreaseButtonGroupProp {
    fanSpeed:  FANSPEEDFORFAN
    onClick: () => void
}

const FanIncreaseButtonGroup = ({
    onClick
  }: FanIncreaseButtonGroupProp): JSX.Element => {
    return (
      <div className='power-button-group'>
        <div
          onClick={onClick}
          className={`power-button off`}
        >
          <ArrowCircleUpIcon className='power-icon' />
          <span>INCREASE</span>
        </div>
      </div>
    )
  }
  
  export default FanIncreaseButtonGroup