import React from 'react'

import { Error } from './'

import { Icon, BEM, setTheme, colorCSS } from '@trading/energies-ui'
import styles from './DataList.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "dataList",
  "display": "block",
  "data": [
    {
      "label": "Category",
      "value": "Hotel"
    },
    {
      "label": "E-Register Declaration",
      "value": "NA",
      "isEmpty": true
    },
    {
      "label": "Receipt Date",
      "value": "14 Oct. 2022"
    },
    {
      "label": "Comment",
      "value": "Registration Fee",
      "status": {
        "color": "green",
        "icon": "check"
      }
    }
  ]
}
*/
/*----------------------------------------------------------------------------*/
export const DataItem = ({ label, value, status, color, isEmpty, href }) => {
  const theme = setTheme(color) || {}
  return (
    <li className={b('item', { isEmpty, hasHref: href })} style={theme}>
      <span className={b('label')} style={{ color: colorCSS(status?.color) }}>
        <span className={b('ellipsis')}>{label}</span>
        {status && (
          <Icon
            className={b('status')}
            name={status.icon}
            color={status.color}
            size='xs'
          />
        )}
      </span>
      {href ? (
        <a
          className={b('value')}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
        >
          {value}
        </a>
      ) : (
        <span className={b('value')}>{value}</span>
      )}
    </li>
  )
}
/*----------------------------------------------------------------------------*/
export const DataList = ({ type, display, data }) => {
  return (
    <ul className={b({}, ['inline'])} data-type={type}>
      {data?.map((item, i) => (
        <DataItem key={i} {...item} />
      ))}
      {(!data || data.length === 0) && <Error variable='data' value={data} />}
    </ul>
  )
}

export default DataList
