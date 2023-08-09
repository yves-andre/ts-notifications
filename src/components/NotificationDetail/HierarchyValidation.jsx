import React from 'react'

import { IconButton, Input, BEM } from '@trading/energies-ui'
import styles from './HierarchyValidation.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
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

*/
/*----------------------------------------------------------------------------*/
export const HierarchyValidation = ({
  type,
  commentEnabled,
  commentPlaceholder,
  validateButton,
  rejectButton,
}) => {
  return (
    <div className={b()} data-type={type}>
      <Input
        placeholder={commentPlaceholder}
        round
        variant='gray'
        margin={0}
        type='text'
        style={{ flex: 1, lineHeight: 1 }}
        disabled={!commentEnabled}
      />
      <div className={b('actions')}>
        {validateButton && (
          <IconButton
            color='corporate/green'
            icon='filled/check-circle'
            size='xl'
          >
            Validate
          </IconButton>
        )}
        {rejectButton && (
          <IconButton
            color='corporate/red'
            icon='filled/times-circle'
            size='xl'
          >
            Reject
          </IconButton>
        )}
      </div>
    </div>
  )
}

export default HierarchyValidation
