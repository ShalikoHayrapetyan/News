import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Addnewspage from './Addnewspage';
import NewsListpage from './NewsListpage';
import Categorypage from './Categorypage';
import Editnews from './Editnews';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect,

} from "react-router-dom";
import AdminHomePage from './AdminHomePage';

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
                            <Addnewspage />
                        </Route>
                        <Route path={`${path}/newsList`}>
                            <NewsListpage />
                        </Route>
                        <Route path={`${path}/editNews`}>
                           <Editnews />
                        </Route>
                        <Route path={`${path}/newsCategories`}>
                            <Categorypage />
                        </Route>
                        <Redirect to="/admin"/>
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Dashboard;