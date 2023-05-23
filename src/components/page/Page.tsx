import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Header } from '@trading/energies-ui'
import { Topbar } from '../../pages/topbar/Topbar'
import { Sidebar } from '../../pages/sidebar/Sidebar'

import './Page.scss'
import { APP_CONFIG } from '../../data/app-config'

export const Page: React.FC = () => {
  const totalLogo =
    process.env.NODE_ENV !== 'development'
      ? APP_CONFIG.THEME_ASSETS.totalLogo
      : 'https://www.totalenergies.fr/typo3conf/ext/de_site_package/Resources/Public/Dist/Images/Logo/totalenergies--vertical.svg'

  return (
    <Layout styleContent={{ padding: 0, overflow: 'hidden' }}>
      <Layout.Header>
        <Header
          active='notifications'
          onChange={(key) => {}}
          logo={totalLogo}
          className='globalNav'
          settingsAction={() => {}}
          items={[
            {
              key: 'notifications',
              title: 'Trading Notifications',
              onClick: () => {
              },
            },
            {
              key: 'dwp',
              title: 'T&S Digital Workplace',
              onClick: () => {
                window.location.replace(window.location.origin)
              },
            },
          ]}
        ></Header>
      </Layout.Header>
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
