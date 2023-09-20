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
  Text,
  Title,
  ValidationHistory,
  Viewer,
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
    viewer: Viewer,
    dataList: DataList,
    date: Date,
    employeeCard: EmployeeCard,
    footerBlock: Footer,
    footer: Footer,
    fromToDate: FromToDate,
    headerBlock: Header,
    header: Header,
    hierarchyValidation: HierarchyValidation,
    listBlock: List,
    list: List,
    rulesValidationButton: RulesValidationButton,
    sectionBlock: Section,
    section: Section,
    text: Text,
    title: Title,
    validationHistory: ValidationHistory,
  }
  const CurrentView = View[type] ?? NotFoundView
  return <CurrentView type={type} {...restProps} />
}

export default Block
