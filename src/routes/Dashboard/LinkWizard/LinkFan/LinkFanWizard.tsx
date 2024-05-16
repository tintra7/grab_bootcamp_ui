import FanInformationInput from "./FanInformationInput";

import '@/assets/css/components/LinkFanWizard/LinkFanWizard.css'

const LinkFanWizard: React.FC = () => {
    return (
      <div className='wizard-container'>
        <div className='phase-view'>
          <FanInformationInput />
        </div>
      </div>
    )
  }
  
  export default LinkFanWizard