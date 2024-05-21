import * as React from 'react'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'

import { ISideBarItem } from './SidebarItem'

interface BottomNavProps {
  items: ISideBarItem[]
  onClickMenuItem: (key: string) => void
}

export default function BottomNav({ items, onClickMenuItem }: BottomNavProps) {
  const [value, setValue] = React.useState(0)

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        {items.map((item) => (
          <BottomNavigationAction
            label={item.label}
            icon={item.icon}
            key={item.key}
            onClick={() => onClickMenuItem(item.key)}
            sx={{ minWidth: 'auto' }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}
