import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'

import '@/assets/css/layouts/Header.css'

const Header: React.FC = () => {
  return (
    <div className='header'>
      <div className='user-profile'>
        <AccountCircleTwoToneIcon className='user-icon' />
        <span className='username'>David Ng</span>
      </div>
    </div>
  )
}

export default Header
