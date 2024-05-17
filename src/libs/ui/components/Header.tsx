import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { NotificationsRounded } from '@mui/icons-material'

import { colors } from '..'

import '@/assets/css/layouts/Header.css'

function stringAvatar(name: string) {
  return {
    sx: { bgcolor: colors.green900 },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

const Header: React.FC = () => {
  return (
    <div className='header'>
      <div className='text'>
        <Typography variant='h5' fontWeight={600}>
          Welcome home, David Ng
        </Typography>
        <Typography variant='h6' color='textSecondary'>
          Have a great day!
        </Typography>
      </div>
      <div className='user'>
        <IconButton>
          <NotificationsRounded />
        </IconButton>
        <Avatar {...stringAvatar('David Ng')} />
      </div>
    </div>
  )
}

export default Header
