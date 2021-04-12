import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import tileData from './tileData';
import Aside from './Aside';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "98%",
        height: 220,
    },
    img: {
        height: "100%",
        objectFit: 'contain'
    }
}));

const NewsPage = () => {
    const classes = useStyles();
    let newsId = useLocation().pathname.substring(6)
    const allNewsData = useSelector(state => state.fireBaseData.allNewsData);
    let selectedNews = allNewsData.find(news => news.id === newsId)
    console.log(selectedNews)
    return (
        <div className="container">
            <div className="site-content">
                <div className="main">
                    <div className="article-body">
                        <h1>{selectedNews.title}</h1>
                        <div className="article-body__head">
                            <p className="flex-icon"><CalendarTodayIcon /> {selectedNews.date}</p>
                            <p className="flex-icon"><RateReviewIcon /> {selectedNews.category}</p>
                            <p className="flex-icon"><FavoriteIcon /> 37</p>
                            <p className="flex-icon"><CommentIcon /> 14</p>
                        </div>
                        <h4>{selectedNews.short_desc}</h4>
                        <img src={selectedNews.coverImage} alt="" width="100%" />
                        <p>{selectedNews.desc}</p>
                        {selectedNews.images.length > 2 ? <div className={classes.root}>
                            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                                {selectedNews.images.map((img, index, arr) => (
                                    <GridListTile key={selectedNews.id} cols={1}>
                                        <img className={classes.img} src={img} alt={selectedNews.title} />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div> : selectedNews.images.map(img => <img key={selectedNews.id} src={img} />)}
                    </div>
                </div>

                <Aside />
            </div>
        </div>
    );
}
export default NewsPage