import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Персонал"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Пользователи",
    to: "/users",
    icon: "cilUser",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Бронирование"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Номера",
    to: "/rooms",
    icon: "cilRoom",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Категории номеров",
    to: "/categories",
    icon: "cilStar",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Потоки",
    to: "/flows",
    icon: "cilLoopCircular",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Бронировать",
    to: "/booking",
    icon: "cilCalendar",
    className:"bg--active"
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Клиенты"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Отделы",
    to: "/departments",
    icon: "cilStorage",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Сотрудники",
    to: "/employees",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Должности",
    to: "/positions",
    icon: "cil-people",
  },
];

export default _nav;
