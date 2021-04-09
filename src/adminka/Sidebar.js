import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    useRouteMatch
} from "react-router-dom";

const Sidebar = () => {
    let { url } = useRouteMatch();

    return (
        <div className="sidebar">
            <nav className="navbar">
                <li><Link to={`${url}`}>Home</Link></li>
                <li><Link to={`${url}/addNews`}>Add news</Link></li>
                <li><Link to={`${url}/newsList`}>News list</Link></li>
                <li><Link to={`${url}/newsCategories`}>News categories</Link></li>
            </nav>
        </div>
    )
}
export default Sidebar;