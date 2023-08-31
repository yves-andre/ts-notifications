import React, { useContext, useEffect, useState } from 'react'
import { Button, BEM } from '@trading/energies-ui'
import styles from './RulesValidationButton.module.scss'
import { ValidationContext } from './Panel'
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
export const RulesValidationButton = ({
  type,
  label,
  color,
  icon,
  validatedConfig,
}) => {
  const { validation, currentOpenValidationItem, setValidationRuleValue } =
    useContext(ValidationContext);
  const [checked, setChecked] = useState();

  useEffect(() => {
    if (validation && currentOpenValidationItem) {
      const currentValue = validation[currentOpenValidationItem]?.value;
      if (currentValue !== undefined) {
        setChecked(currentValue);
      }
    }
  }, [validation, currentOpenValidationItem]);

  const onCheckHandler = () => {
    const newCheckedValue = !checked;
    setValidationRuleValue(currentOpenValidationItem, newCheckedValue);
    setChecked(newCheckedValue);
  };

  const currentConfig = checked ? validatedConfig : { label, color, icon };

  return (
    <div className={b()} data-type={type}>
      <Button
        className={b('button')}
        color={currentConfig.color}
        icon={currentConfig.icon}
        onClick={onCheckHandler}
      >
        {currentConfig.label}
      </Button>
    </div>
  )
}

export default RulesValidationButton
