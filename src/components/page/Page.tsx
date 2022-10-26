import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from '@trading/energies-ui'
import { Topbar } from '../../pages/topbar/Topbar'
import { Sidebar } from '../../pages/sidebar/Sidebar'

export const Page: React.FC = () => {
  return (
    <Layout heightDefault={75}>
      <Layout.Top>
        <Topbar />
      </Layout.Top>
      <Layout.Sidebar>
        <Sidebar />
      </Layout.Sidebar>
      <Outlet />
    </Layout>
  )
}

export default Page
