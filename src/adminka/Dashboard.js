import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import Addnewspage from './Addnewspage';
import Newspage from './Newspage';
import Categorypage from './Categorypage';


const Dashboard = () => {
    const { addNews, newsList, category } = useSelector(state => state.pages);

    return (
        <>
            <Header />

            <div className="wrapper">
                <Sidebar />

                <div className="content">

                    {addNews && <Addnewspage />}
                    {newsList && <Newspage />}
                    {category && <Categorypage />}

                </div>
            </div>
        </>
    )
}

export default Dashboard;