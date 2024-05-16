import DeviceInformationInput from './DeviceInformationInput'

import '@/assets/css/components/LinkWizard/LinkWizard.css'

const LinkWizard: React.FC = () => {
  return (
    <div className='wizard-container'>
      <div className='phase-view'>
        <DeviceInformationInput />
      </div>
    </div>
  )
}

export default LinkWizard
