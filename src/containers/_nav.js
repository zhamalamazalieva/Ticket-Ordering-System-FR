import React from 'react'
import CIcon, {hotel} from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Персонал']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Пользователи',
    to: '/users',
    icon: 'cil-contact',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Бронирование']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Номер',
    to: '/rooms',
    icon: 'hotel',   
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Поток',
    to: '/flows',
    icon: 'cil-cursor',
  
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Бронирование']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Отдел',
    to: '/departments',
    icon:'cil-building',
   
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Сотрудники',
    to: '/employees',
    icon: 'cil-people',
  },

  
]

export default _nav
