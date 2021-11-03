import Navbar from "../navbar/Navbar";
import s from "./Layout.module.scss";

interface ILayout {
  children?: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className={s.container}>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
