import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Header from "./Header";
import AllNewsInCategory from "./AllNewsInCategory";
import Footer from "./Footer";
import HomePage from "./HomePage";
import NewsPage from "./NewsPage";

const Main = () => {
  const categoriesData = useSelector(
    (state) => state.fireBaseData.categoryData
  );
  const allNewsData = useSelector((state) => state.fireBaseData.allNewsData);
  let categoryPath = [];
  let newsPath = [];
  categoryPath = categoriesData.map((category) => "/" + category.title);
  newsPath = allNewsData.map((news) => "/news:" + news.id);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/news/:newsId">
          <NewsPage />
        </Route>
        <Route path="/News">
          <AllNewsInCategory />
        </Route>
        <Route path={categoryPath}>
          <AllNewsInCategory />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
