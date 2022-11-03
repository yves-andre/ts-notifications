import React, { ReactNode, useEffect } from 'react'
import { CATEGORY } from '../../../data/constants/category'
import Application from '../../../data/interfaces/application'
import { useAppDispatch } from '../../../hooks/use-app-dispatch'
import { useAppSelector } from '../../../hooks/use-app-selector'
import { filtersActions } from '../../../store/filters-slice'

import { Nav } from '@trading/energies-ui'

import './Menu.scss'
import CategoryColor from '../../../data/interfaces/category-color'

interface Props {
  applications: Application[]
  categoryColors: CategoryColor[]
}

const ACTION_FEED = CATEGORY.ACTION_FEED
const INFORMATION_FEED = CATEGORY.INFORMATION_FEED
const CATEGORIES = [ACTION_FEED, INFORMATION_FEED]

export const Menu: React.FC<Props> = ({ applications, categoryColors }) => {
  const notifications = useAppSelector(
    (state) => state.notifications.notificationItems
  )
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  )
  const selectedApplication = useAppSelector(
    (state) => state.filters.selectedApplication
  )

  const dispatch = useAppDispatch();
  
  const getAppsByCategory = (category: number): Application[] => {
    const filterValue = category === ACTION_FEED ? 'workflow' : 'socialflow'
    return applications?.filter((app) => app.type === filterValue)
  }

  const getAppCount = (application: Application) =>
    notifications.filter((n) =>
      application.match.split(',').includes(n.title.trim().toLowerCase())
    ).length

  const getAppCountByCategory = (category: number): number | null => {
    const count = getAppsByCategory(category).reduce((count, application) => {
      return (count += getAppCount(application))
    }, 0)
    if (count > 0) return count
    return null
  }

  const selectCategoryHandler = (category: number): void => {
    dispatch(filtersActions.setSelectedCategory(category))
    dispatch(filtersActions.setSelectedApplication(''))
  }
  const selectAppHandler = (match: string, category: number) => {
    dispatch(filtersActions.setSelectedCategory(category))
    dispatch(filtersActions.setSelectedApplication(match))
  }

  const getTitleByCategory = (category: number): ReactNode => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return (
          <>
            <b>ACTION</b> FEED
          </>
        )
      case CATEGORY.INFORMATION_FEED:
        return (
          <>
            <b>INFORMATION</b> FEED
          </>
        )
      default:
        return <></>
    }
  }
  const getIconByCategory = (category: number): string | undefined => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return 'validations'
      case CATEGORY.INFORMATION_FEED:
        return 'bellFeed'
      default:
        return undefined
    }
  }
  const getColorByCategory = (category: number): string | undefined => {
    const filterValue = category === ACTION_FEED ? 'workflow' : 'socialflow'
    return categoryColors.find(c => c.title === filterValue)?.color
  }

  const navCategories = CATEGORIES.map((category) => ({
    isExpanded: true,
    key: category,
    color: getColorByCategory(category),
    icon: getIconByCategory(category),
    title: getTitleByCategory(category),
    badge: getAppCountByCategory(category) || undefined,
    items: getAppsByCategory(category).map((app, i) => ({
      key: app.match,
      title: app.title,
      icon: app.image,
      badge: getAppCount(app) || undefined,
      color: getColorByCategory(category),
      onClick: () => selectAppHandler(app.match, category),
    })),
  }))

  const css = `:root {
    --ts-global-theme: var(--ts-color-${getColorByCategory(selectedCategory)});
    --ts-global-theme-dark: var(--ts-color-${getColorByCategory(
      selectedCategory
    )}-dark);
  }`

  return (
    <>
      <style>{css}</style>
      <Nav
        onClick={(item: any) => selectCategoryHandler(item.key)}
        active={selectedApplication || selectedCategory}
        items={navCategories}
        variant='feed'
      />
    </>
  )
}

export default Menu
