import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import PostItem from './PostItem';

const AllNewsInCategory = () => {
    const allNewsData = useSelector(state => state.fireBaseData.allNewsData);
    let catTitle = useLocation().pathname.substring(1);
    let allCategoryNews = []

    catTitle === 'News' ? allCategoryNews = allNewsData
        : allCategoryNews = allNewsData.filter(el => el.category === catTitle)

    return (
        <>
            <Header />

            <div className="container ">
                <h1>{catTitle}</h1>
                <div className="main main_categories">

                    {
                        allCategoryNews.length && allCategoryNews.map(news => (

                            <PostItem key={news.id} news={news} />
                        ))

                    }

                </div>
            </div>

            <Footer />
        </>
    );
}
export default AllNewsInCategory