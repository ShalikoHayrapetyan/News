import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RateReviewIcon from '@material-ui/icons/RateReview';

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
                <div className="main" >
                      
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