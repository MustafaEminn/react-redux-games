import { Link } from "react-router-dom";
import { BASE } from "../../config/base";
import s from "./Logo.module.scss";

interface ILogo {
  link?: boolean;
}

function Logo({ link = true }: ILogo) {
  return link ? (
    <Link to="/" className={s.logo}>
      {BASE.APP_NAME}
    </Link>
  ) : (
    <h1 className={s.logo}>{BASE.APP_NAME}</h1>
  );
}

export default Logo;
