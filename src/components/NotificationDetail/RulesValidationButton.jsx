import React, { useState } from 'react'
import { Button, BEM } from '@trading/energies-ui'
import styles from './RulesValidationButton.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "rulesValidationButton",
  "label": "Comment Check",
  "color": "orange",
  "icon": "outline/check-square'",
  "validationValue": "{{validation[item.key]}}",
  "validatedConfig": {
    "label": "Comment checked",
    "icon": "filled/check-square'",
    "color": "green"
  }
}

*/
/*----------------------------------------------------------------------------*/

/*-----------------------------VERIFICATION : OK-----------------------------*/
export const RulesValidationButton = ({
  type,
  label,
  color,
  icon,
  validatedConfig,
  validationValue,
}) => {
  const [checked, setChecked] = useState(validationValue)

  return (
    <div className={b()} data-type={type}>
      <Button
        className={b('button')}
        color={checked ? validatedConfig?.color : color}
        icon={checked ? validatedConfig?.icon : icon}
        onClick={() => setChecked(!checked)}
      >
        {checked ? validatedConfig?.label : label}
      </Button>
    </div>
  )
}

export default RulesValidationButton
