import LoadingView from "../loading/LoadingView";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
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
      <div className={s.children}>{children}</div>
      <Sidebar />
    </div>
  );
}

export default Layout;
