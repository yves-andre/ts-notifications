import React, { ReactNode } from 'react'
import './Topbar.scss'
import { Tabs } from './Tabs/Tabs'
import DelegationToggle from './DelegationToggle/DelegationToggle'
import { useAppSelector } from '../../hooks/use-app-selector'
import { CATEGORY } from '../../data/constants/category'

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
    <div className='Topbar'>
      <div className='Topbar-title'>{getTitleByCategory(selectedCategory)}</div>
      <div className='Topbar-actions'>
        <Tabs />
        <DelegationToggle />
      </div>
    </div>
  )
}

export default Topbar
