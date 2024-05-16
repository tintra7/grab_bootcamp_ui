import { useState } from 'react'
import { Link } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home'
import HeatPumpIcon from '@mui/icons-material/HeatPump'
import LinkIcon from '@mui/icons-material/Link'
import LogoutIcon from '@mui/icons-material/Logout'

import '@/assets/css/layouts/Sidebar.css'

const Sidebar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('HOME')

  const switchTab = (tab: string): void => {
    setSelectedTab(tab)
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <h1>ACCS</h1>
      </div>
      <div className='sidebar-body'>
        <Link to='/'>
          <div
            className={`sidebar-tab ${selectedTab == 'HOME' ? 'active' : ''}`}
            onClick={() => switchTab('HOME')}
          >
            <HomeIcon className='sidebar-tab-icon' />
            <span className='sidebar-tab-title'>Home</span>
          </div>
        </Link>
        <Link to='/devices'>
          <div
            className={`sidebar-tab ${
              selectedTab == 'DEVICES' ? 'active' : ''
            }`}
            onClick={() => switchTab('DEVICES')}
          >
            <HeatPumpIcon className='sidebar-tab-icon' />
            <span className='sidebar-tab-title'>Devices</span>
          </div>
        </Link>
        <Link to='/link'>
          <div
            className={`sidebar-tab ${selectedTab == 'LINK' ? 'active' : ''}`}
            onClick={() => switchTab('LINK')}
          >
            <LinkIcon className='sidebar-tab-icon' />
            <span className='sidebar-tab-title'>Link</span>
          </div>
        </Link>
        <Link to='/fans'>
          <div
            className={`sidebar-tab ${
              selectedTab == 'FANS' ? 'active' : ''
            }`}
            onClick={() => switchTab('FANS')}
          >
            <HeatPumpIcon className='sidebar-tab-icon' />
            <span className='sidebar-tab-title'>FANS</span>
          </div>
        </Link>
        <Link to='/linkfan'>
          <div
            className={`sidebar-tab ${selectedTab == 'LINKFAN' ? 'active' : ''}`}
            onClick={() => switchTab('LINKFAN')}
          >
            <LinkIcon className='sidebar-tab-icon' />
            <span className='sidebar-tab-title'>Link Fan</span>
          </div>
        </Link>
      </div>
      <div className='sidebar-footer'>
        <div className='sidebar-tab'>
          <LogoutIcon className='sidebar-tab-icon' />
          <span className='sidebar-tab-title'>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
