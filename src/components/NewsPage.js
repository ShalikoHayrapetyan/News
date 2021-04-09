import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RateReviewIcon from '@material-ui/icons/RateReview';

import Header from "./Header";
import Aside from './Aside';
import Footer from "./Footer";

const NewsPage = () => {
    return (
        <>
            <Header />

            <div className="container">
                <div className="site-content">
                    <div className="main">
                        <div className="article-body">
                            <h1>Title news</h1>

                            <div class="article-body__head">
                                <p className="flex-icon"><CalendarTodayIcon /> September 14, 2016</p>
                                <p className="flex-icon"><RateReviewIcon /> Medicine</p>
                                <p className="flex-icon"><FavoriteIcon /> 37</p>
                                <p className="flex-icon"><CommentIcon /> 14</p>
                            </div>


                            <h4>short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test</h4>

                            <img src="https://material-ui.com/static/images/cards/paella.jpg" alt="" width="100%" />

                            <p>short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test short description test test short description test testshort description test test short description test test short description test test</p>

                            <img src="https://material-ui.com/static/images/cards/paella.jpg" alt="" width="" />
                            <img src="https://material-ui.com/static/images/cards/paella.jpg" alt="" width="" />

                        </div>
                    </div>

                    <Aside />
                </div>
            </div>

            <Footer />
        </>
    );
}
export default NewsPage