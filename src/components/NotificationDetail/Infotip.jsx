import React, { useEffect } from 'react'

import { Block } from './'

import { BEM } from '@trading/energies-ui'
import styles from './Infotip.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "icon": "filled/info-circle",
  "color": "red",
  "tooltip": "Caption",
  "closeButtonText": "Ok, Got it",
  "items": [
    {
      "type": "text",
      "icon": "warning",
      "color": "yellow",
      "title": "Mandatory Check",
      "subtitle": "",
      "text": "You have to check this line if you want to validate this item."
    },
    {
      "type": "text",
      "icon": "warning",
      "color": "purple",
      "title": "With beneficiary company",
      "subtitle": "",
      "text": "There is a beneficiary company in this expense line."
    }
  ]
}
*/
/*----------------------------------------------------------------------------*/

/*-----------------------------VERIFICATION : OK-----------------------------*/
export const Infotip = ({ open, closeButtonText, onClose, items }) => {
  const handleEscapePress = (event) => {
    const { keyCode } = event
    if (keyCode === 27) {
      onClose?.()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress)
    return () => {
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [])

  return (
    <div className={b({ isOpen: open })} onClick={onClose}>
      <div className={b('content')} onClick={(e) => e.stopPropagation()}>
        {items.map((item, i) => {
          return (
            <React.Fragment key={i}>
              {item.type === 'text' && <Block type='text' {...item} />}
            </React.Fragment>
          )
        })}
        {closeButtonText && (
          <span className={b('close')} onClick={onClose}>
            {closeButtonText}
          </span>
        )}
      </div>
    </div>
  )
}

export default Infotip
