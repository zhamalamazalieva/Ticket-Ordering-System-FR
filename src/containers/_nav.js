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
    icon: 'cilUser',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Бронирование']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Номер',
    to: '/rooms',
    icon: 'cilRoom',   
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Поток',
    to: '/flows',
    icon: 'cil-cursor',
  
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Клиенты']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Отдел',
    to: '/departments',
    icon:'cilStorage',
   
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Сотрудники',
    to: '/employees',
    icon: 'cil-people',
  },

  
]

export default _nav
