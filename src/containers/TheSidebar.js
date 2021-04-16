import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import { set } from '../redux/action/settingsAction'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.setting.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(set(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <h4>Pansionat Altyn-Kol</h4>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
