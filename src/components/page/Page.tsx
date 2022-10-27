import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from '@trading/energies-ui'
import { Topbar } from '../../pages/topbar/Topbar'
import { Sidebar } from '../../pages/sidebar/Sidebar'

import './Page.scss'

export const Page: React.FC = () => {
  return (
    <Layout styleContent={{ padding: 0, overflow: 'hidden' }}>
      <Layout.Nav>
        <Sidebar />
      </Layout.Nav>
      <div className='Page'>
        <div className='Page-content'>
          <Topbar />
          <Outlet />
        </div>
        {/*
        <div className='Page-form'>
            <div className='Page-header'></div>
        </div>
        */}
      </div>
    </Layout>
  )
}

export default Page
