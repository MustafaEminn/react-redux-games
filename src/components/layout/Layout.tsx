import LoadingView from "../loading/LoadingView";
import Navbar from "../navbar/Navbar";
import s from "./Layout.module.scss";

interface ILayout {
  children?: React.ReactNode;
  loading?: boolean;
}

function Layout({ children, loading = false }: ILayout) {
  return loading ? (
    <LoadingView />
  ) : (
    <div className={s.container}>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
