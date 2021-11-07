import { CloseOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import sidebar, {
  getSidebarVisibleValue,
  setSidebarVisibleValue,
} from "../../store/sidebar";
import Logo from "../logo/Logo";
import s from "./Sidebar.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const visible = useSelector(getSidebarVisibleValue);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setSidebarVisibleValue(false));
  };
  return (
    <div visible={visible ? "true" : "false"} className={s.container}>
      <div id="sidebar" className={s.containerSidebar}>
        <CloseOutlined
          onClick={() => closeSidebar()}
          className={s.containerSidebar_closeIcon}
        />
        <Logo />
        <Link to="/">Home</Link>

        <Link to="/favorites">Favorites</Link>
      </div>
    </div>
  );
};

export default Sidebar;
