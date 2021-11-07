import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSidebarVisibleValue } from "../../store/sidebar";
import BarsIcon from "../icons/BarsIcon";
import Logo from "../logo/Logo";
import s from "./Navbar.module.scss";

const Navbar = () => {
  const dispatch = useDispatch();

  const openSidebar = () => {
    dispatch(setSidebarVisibleValue(true));
  };
  return (
    <Row wrap={false} className={s.container}>
      <Col className={s.containerLeft}>
        <Logo />
      </Col>
      <Col className={s.containerRight}>
        <Link className={s.containerRight_link} to="/">
          Home
        </Link>
        <Link className={s.containerRight_link} to="/favorites">
          Favorites
        </Link>
        <button onClick={() => openSidebar()} className={s.containerRight_bars}>
          <BarsIcon />
        </button>
      </Col>
    </Row>
  );
};

export default Navbar;
