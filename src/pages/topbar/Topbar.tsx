import React, { ReactNode } from 'react'
import './Topbar.scss'
import { Tabs } from './Tabs/Tabs'
import DelegationToggle from './DelegationToggle/DelegationToggle'
import { useAppSelector } from '../../hooks/use-app-selector'
import { CATEGORY } from '../../data/constants/category'

import { Toolbar } from '@trading/energies-ui'

export const Topbar: React.FC = () => {
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  )

  const getTitleByCategory = (category: number): ReactNode => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return (
          <>
            <b>ACTION</b> FEED
          </>
        )
      case CATEGORY.INFORMATION_FEED:
        return (
          <>
            <b>INFORMATION</b> FEED
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <Toolbar
      style={{
        height: 'var(--height)',
        margin: '0 -25px 20px',
        background: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
    >
      <Toolbar.Left>
        <Tabs />
      </Toolbar.Left>
      <Toolbar.Right>
        <DelegationToggle />
      </Toolbar.Right>
    </Toolbar>
  )
}

export default Topbar
