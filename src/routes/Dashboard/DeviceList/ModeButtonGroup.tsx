import { useState } from 'react'

import AcUnitIcon from '@mui/icons-material/AcUnit'
import OpacityIcon from '@mui/icons-material/Opacity'
import SettingsIcon from '@mui/icons-material/Settings'

import { MODE, STATUS } from '@/constants/enum'

import '@/assets/css/components/DeviceList/ModeButtonGroup.css'

interface ModeBtnGrProp {
  mode: MODE
  status: STATUS
  onModeChange: (mode: MODE) => void
}

const ModeButtonGroup = ({
  mode,
  status,
  onModeChange
}: ModeBtnGrProp): JSX.Element => {
  const [currentMode, setCurrentMode] = useState<MODE>(mode)

  const onModeClick = (mode: MODE): void => {
    setCurrentMode(mode)
    onModeChange(mode)
  }

  return (
    <div
      className={`mode-button-group ${status != STATUS.ON ? 'disable' : ''}`}
    >
      <div
        className={`mode-button button ${
          currentMode == MODE.COOLING ? 'active' : 'inactive'
        }`}
        onClick={() => onModeClick(MODE.COOLING)}
      >
        <AcUnitIcon className='mode-icon' />
        <span>Cooling</span>
      </div>
      <div
        className={`mode-button button ${
          currentMode == MODE.DEFAULT ? 'active' : 'inactive'
        }`}
        onClick={() => onModeClick(MODE.DEFAULT)}
      >
        <SettingsIcon className='mode-icon' />
        <span>Default</span>
      </div>
      <div
        className={`mode-button button ${
          currentMode == MODE.MOISTURING ? 'active' : 'inactive'
        }`}
        onClick={() => onModeClick(MODE.MOISTURING)}
      >
        <OpacityIcon className='mode-icon' />
        <span>Moisturing</span>
      </div>
    </div>
  )
}

export default ModeButtonGroup
