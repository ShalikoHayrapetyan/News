import React from 'react';
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
            <div className="container ">
                <h1>{catTitle}</h1>
                <div className="main main_categories">
                    { allCategoryNews.length && allCategoryNews.map(news => <PostItem key={news.id} news={news} /> ) }
                </div>
            </div>
          );
}
export default AllNewsInCategory