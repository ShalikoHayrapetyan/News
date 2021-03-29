import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import Addnewspage from './Addnewspage';
import NewsListpage from './NewsListpage';
import Categorypage from './Categorypage';
import Editnews from './Editnews';


const Dashboard = () => {
    const { addNews, newsList, category, editNewsId } = useSelector(state => state.pages);

    return (
        <>
            <Header />

            <div className="wrapper">
                <Sidebar />

                <div className="content">

                    {addNews && <Addnewspage />}
                    {newsList && <NewsListpage />}
                    {category && <Categorypage />}
                    {editNewsId && <Editnews />}

                </div>
            </div>
        </>
    )
}

export default Dashboard;