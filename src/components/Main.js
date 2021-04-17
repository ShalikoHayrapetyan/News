import { Redirect, Route, Switch } from "react-router";
import Header from "./Header";
import AllNewsInCategory from "./AllNewsInCategory";
import Footer from "./Footer";
import HomePage from "./HomePage";
import NewsPage from "./NewsPage";
import Clock from "./Clock";

const Main = () => {
  return (
    <>
      <Header />
      <div className="clock">
        <Clock />
      </div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/news/:newsId">
          <NewsPage />
        </Route>
        <Route path="/:catTitle">
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
