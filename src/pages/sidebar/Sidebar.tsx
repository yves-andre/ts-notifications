import React, { useEffect, useState } from 'react'
import { getApplications } from '../../services/application-service'
import Application from '../../data/interfaces/application'
import Menu from './menu/Menu'

import './Sidebar.scss'

export const Sidebar: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>()

  // Load the applications
  useEffect(() => {
    ;(async () => {
      const applications: Application[] = await getApplications()
      setApplications(applications)
    })()
  }, [])

  return (
    <div className='Sidebar'>
      {applications && <Menu applications={applications} />}
      {!applications && <p>Loading ...</p>}
    </div>
  )
}

export default Sidebar
