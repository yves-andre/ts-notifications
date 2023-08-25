import React from 'react'

import { Block } from './'

import { BEM } from '@trading/energies-ui'
import styles from './Footer.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
/*
// EXEMPLE
{
  "type": "footerBlock",
  "items": [
    {
      "type": "hierarchyValidation",
      "commentEnabled": true,
      "commentPlaceholder": "Comments",
      "validateButton" : {
        "commentMandatory": false
      },
      "rejectButton": {
        "commentMandatory": true
      }
    }
  ]
}
*/
/*----------------------------------------------------------------------------*/

/*-----------------------------VERIFICATION : OK-----------------------------*/
export const Footer = ({ type, items }) => {
  return (
    <footer className={b()} data-type={type}>
      {items.map((item, i) => (
        <Block key={i} {...item} />
      ))}
    </footer>
  )
}

export default Footer
