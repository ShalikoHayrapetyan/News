import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddNewsPage from "./AddNewsPage";
import NewsListPage from "./NewsListPage";
import CategoryPage from "./CategoryPage";
import EditNews from "./EditNews";
import AdminHomePage from "./AdminHomePage";

const Dashboard = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Header />

      <div className="wrapper">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route exact path={path}>
              <AdminHomePage />
            </Route>
            <Route path={`${path}/addNews`}>
              <AddNewsPage />
            </Route>
            <Route path={`${path}/newsList`}>
              <NewsListPage />
            </Route>
            <Route path={`${path}/EditNews`}>
              <EditNews />
            </Route>
            <Route path={`${path}/newsCategories`}>
              <CategoryPage />
            </Route>
            <Redirect to="/admin" />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
