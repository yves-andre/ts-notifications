import React from 'react'

import {
  DataList,
  Date,
  EmployeeCard,
  Footer,
  FromToDate,
  Header,
  HierarchyValidation,
  List,
  RulesValidationButton,
  Section,
  Slideshow,
  Text,
  Title,
  ValidationHistory,
} from './'

import { BEM } from '@trading/energies-ui'

import styles from './Block.module.scss'
const b = BEM(styles)
/*----------------------------------------------------------------------------*/

const NotFoundView = ({ type }) => (
  <div className={b({}, [type])}>
    Type not found : <span className={b('type')}>{type}</span>
  </div>
)
/*----------------------------------------------------------------------------*/
export const Block = ({ type, ...restProps }) => {
  const View = {
    dataList: DataList,
    date: Date,
    employeeCard: EmployeeCard,
    footerBlock: Footer,
    fromToDate: FromToDate,
    headerBlock: Header,
    hierarchyValidation: HierarchyValidation,
    listBlock: List,
    rulesValidationButton: RulesValidationButton,
    sectionBlock: Section,
    slideshow: Slideshow,
    text: Text,
    title: Title,
    validationHistory: ValidationHistory,
  }
  const CurrentView = View[type] ?? NotFoundView
  return <CurrentView type={type} {...restProps} />
}

export default Block
