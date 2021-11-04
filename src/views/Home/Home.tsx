import InputSelectPrimary from "../../components/input/select/selectPrimary/InputSelectPrimary";
import Layout from "../../components/layout/Layout";
import s from "./Home.module.scss";

function HomeView() {
  return (
    <Layout>
      <div className={s.containerFilter}>
        <InputSelectPrimary
          list={["amskfmksafmksmakfmksa", "mksamfksmakf", "sfmdskfm"]}
          placeholder="Search"
          multipleSelect={true}
        />
      </div>
    </Layout>
  );
}

export default HomeView;
