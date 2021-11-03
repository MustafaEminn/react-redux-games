import Logo from "../logo/Logo";
import s from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={s.container}>
      <div className={s.containerLeft}>
        <Logo />
      </div>
    </div>
  );
};

export default Navbar;
