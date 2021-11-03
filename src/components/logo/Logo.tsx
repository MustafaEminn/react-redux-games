import { Link } from "react-router-dom";
import { BASE } from "../../config/base";
import s from "./Logo.module.scss";

function Logo() {
  return (
    <Link to="/" className={s.logo}>
      {BASE.APP_NAME}
    </Link>
  );
}

export default Logo;
