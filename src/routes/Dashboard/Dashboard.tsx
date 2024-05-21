import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  BarChartRounded,
  HeatPumpRounded,
  HomeRounded,
  InsertLinkRounded,
  WindPower
} from '@mui/icons-material'

import { colors } from '@/libs/ui'
import { ISideBarItem, Section, SideBar } from '@/libs/ui/components'
import BottomNav from '@/libs/ui/components/BottomNav'
import Header from '@/libs/ui/components/Header'
import theme from '@/libs/ui/theme'
import DeviceList from '@/routes/Dashboard/DeviceList/DeviceList'
import Home from '@/routes/Dashboard/Home/Home'
import FanList from './FanList/FanList'
import LinkWizard from './LinkWizard/LinkDevice/LinkWizard'
import LinkFanWizard from './LinkWizard/LinkFan/LinkFanWizard'
import Data from './Data'

import '@/assets/css/layouts/View.css'

const SideBarItems: ISideBarItem[] = [
  {
    key: '',
    label: 'Home',
    icon: <HomeRounded />
  },
  {
    key: 'devices',
    label: 'Devices',
    icon: <HeatPumpRounded />
  },
  {
    key: 'link',
    label: 'Link',
    icon: <InsertLinkRounded />
  },
  {
    key: 'fans',
    label: 'Fans',
    icon: <WindPower />
  },
  {
    key: 'linkfan',
    label: 'Link Fan',
    icon: <InsertLinkRounded />
  },
  {
    key: 'data',
    label: 'Data',
    icon: <BarChartRounded />
  }
]

const Dashboard: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const hidden = useMediaQuery(theme.breakpoints.down('sm'))

  const key = location.pathname.split('/').pop()
  const [active, setActive] = useState(key || '')
  const handleClick = (key: string) => {
    if (key === active) return
    navigate(`/${key}`)
    setActive(key)
  }
  return (
    <>
      {hidden ? (
        <BottomNav items={SideBarItems} onClickMenuItem={handleClick} />
      ) : (
        <SideBar
          header={
            <Typography
              variant='subtitle1'
              textTransform='uppercase'
              fontWeight='bold'
              sx={{
                color: colors.green900
              }}
            >
              ACCS
            </Typography>
          }
          active={active}
          SideBarItems={SideBarItems}
          onClickMenuItem={handleClick}
        />
      )}
      <Section>
        <Header />
        <Routes>
          <Route element={<Home />} path='/'></Route>
          <Route element={<DeviceList />} path='/devices'></Route>
          <Route element={<LinkWizard />} path='/link'></Route>
          <Route element={<FanList />} path='/fans'></Route>
          <Route element={<LinkFanWizard />} path='/linkfan'></Route>
          <Route element={<Data />} path='/data'></Route>
        </Routes>
      </Section>
    </>
  )
}

export default Dashboard
