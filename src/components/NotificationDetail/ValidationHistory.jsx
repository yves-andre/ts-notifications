import React from 'react'

import { Error, Page } from './'

import { Icon, BEM, colorCSS } from '@trading/energies-ui'

import styles from './ValidationHistory.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "validationHistory",
  "data": {
    "history": [
      {
        "title": "30 Oct 2022 | Hierarchy Validation",
        "user": "Bille Jean, Jeanne DELANOE, John DOE, Elodie YGREK",
        "status": {
          "color": "orange",
          "label": "Pending"
        }
      },
      {
        "title": "30 Oct 2022 | Employee Validation",
        "user": "Alexandra DE LA VILLARDIERE",
        "status": {
          "color": "green",
          "label": "Validated"
        }
      },
      {
        "title": "29 Oct 2022 | Secretary Validation",
        "user": "Elena CORDOVA",
        "status": {
          "color": "green",
          "label": "Validated"
        },
        "comment": "Ajouter le reçu du Taxi Uber svp"
      }
    ]
  }
}
*/

/*----------------------------------------------------------------------------*/
export const ValidationHistoryItem = ({ title, user, status, comment }) => {
  return (
    <div className={b('item')}>
      <span className={b('title')}>
        {title}
        {status && (
          <span
            className={b('status')}
            style={{ color: colorCSS(status.color) }}
          >
            {status.label}
          </span>
        )}
      </span>
      <div className={b('user')}>{user}</div>
      {comment && (
        <div className={b('comment')}>
          <Icon
            className={b('commentIcon')}
            name='outline/chat'
            color='corporate/lightPearl'
          />
          {comment}
        </div>
      )}
    </div>
  )
}

/*----------------------------------------------------------------------------*/
export const ValidationHistory = ({ type, data }) => {
  const history = data?.history
  return (
    <div className={b()} data-type={type}>
      <Page.Header icon='history' title='Validation History' />
      {history?.map((h, i) => (
        <ValidationHistoryItem key={i} {...h} />
      ))}
      {(!history || history.length === 0) && (
        <Error variable='history' value={history} />
      )}
    </div>
  )
}

export default ValidationHistory
