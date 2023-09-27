import React from 'react'

import { Block, Page } from './'

import { BEM } from '@trading/energies-ui'
import styles from './EmployeeCard.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "employeeCard",
  "data": {
    "employee": {
      "fullName": "Alexandra DE LA VILLARDIERE",
      "image": "path/to/image.png",
      "jobTitle": "General Manager Trading Ops and Logistics",
      "branch": "TS",
      "department": "Trading",
      "site": "Geneva",
      "service": "Trading Ops and Logistics",
      "hierarchy": [
        {
          "level": "N+1",
          "name": "Billie Jean"
        },
        {
          "level": "N+2",
          "name": "Jeanne DELANOE, John DOE, Elodie YGREK"
        }
      ]
    }
  }
}

*/
/*----------------------------------------------------------------------------*/
export const EmployeeCard = ({ type, data }) => {
  const {
    fullName,
    image,
    jobTitle,
    branch,
    department,
    site,
    service,
    hierarchy,
  } = data.employee
  return (
    <div className={b()} data-type={type}>
      <Page.Header image={image} title={fullName} subtitle={jobTitle} />
      <Block
        type='sectionBlock'
        title='Employee Details'
        items={[
          {
            type: 'dataList',
            data: [
              { label: 'Branch', value: branch },
              { label: 'Site', value: site },
              { label: 'Departement', value: department },
              { label: 'Service', value: service },
            ],
          },
        ]}
      />
      {hierarchy && (
        <Block
          type='sectionBlock'
          title='Hierarchy'
          items={[
            {
              type: 'dataList',
              data: hierarchy.map((i) => ({
                label: i.level,
                value: i.name,
              })),
            },
          ]}
        />
      )}
    </div>
  )
}

export default EmployeeCard
