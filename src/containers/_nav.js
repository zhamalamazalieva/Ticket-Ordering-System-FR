import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Отдел',
    to: '/departments',
    icon:'cil-building',
   
  },
 
  {
    _tag: 'CSidebarNavItem',
    name: 'Пользователи',
    to: '/users',
    icon: 'cil-contact',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Сотрудники',
    to: '/employees',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Бронирование']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Номер',
    to: '/rooms',
    icon: 'cil-home',   
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Поток',
    to: '/flows',
    icon: 'cil-cursor',
  
  },
  
]

export default _nav
