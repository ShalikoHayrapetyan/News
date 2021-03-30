import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Addnewspage from './Addnewspage';
import NewsListpage from './NewsListpage';
import Categorypage from './Categorypage';
import Editnews from './Editnews';
import AddCategoryForm from './AddCategoryForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,

} from "react-router-dom";

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
                            <h3>Home</h3>
                        </Route>
                        <Route path={`${path}/addNews`}>
                            <Addnewspage />
                        </Route>
                        <Route path={`${path}/newsList`}>
                            <NewsListpage />
                        </Route>
                        <Route path={`${path}/newsCategories`}>
                            <Categorypage />
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Dashboard;