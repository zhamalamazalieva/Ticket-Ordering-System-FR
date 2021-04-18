import React from "react";
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {logout} from '../redux/action/authAction'

const TheHeaderDropdown = () => {

  const dispatch = useDispatch()

  const onClickLogout = () => {
    dispatch(logout())
  }

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/avatar.png"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Профиль
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Настройки
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={onClickLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          <Link to="/login">Выйти</Link>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
