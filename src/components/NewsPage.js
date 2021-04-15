import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { v4 as uuidv4 } from 'uuid';
//import tileData from './tileData';
import Aside from './Aside';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../App';
import CommentsBox from './actions/CommentsBox';

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
    wrap_imgs: {
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    imgs: {
        width: "47%",
    }
}));

const NewsPage = () => {
    const classes = useStyles();
    let newsId = useLocation().pathname.substring(6)
    const allNewsData = useSelector(state => state.fireBaseData.allNewsData);
    const localUserEmail = useSelector(state => state.authReducer.adminEmail);
    const dispatch = useDispatch()


    let selectedNews = allNewsData.find(news => news.id === newsId)
    let { like, id } = selectedNews
    const updateNews = () => {
        let index = allNewsData.indexOf(selectedNews)
        let newData = [...allNewsData]
        newData[index] = { ...selectedNews, like }
        dispatch({
            type: 'likesData',
            payload: {
                data: newData
            }
        });
        const washingtonRef = db.collection("news").doc(id);
        return washingtonRef.update({
            like
        })
    }
    const handleOnLike = () => {
        if (localUserEmail) {
            if (like.includes(localUserEmail)) {
                like = like.filter(name => name !== localUserEmail)

            } else {
                like = [...like, localUserEmail]

            }
            updateNews()
        } else alert("Pleasa Sign in or Sign Up")

    }

    return (
        <div className="container">
            <div className="site-content">
                <div className="main">
                    <div className="article-body">
                        <h1>{selectedNews.title}</h1>
                        <div className="article-body__head">
                            <p className="flex-icon"><CalendarTodayIcon /> {selectedNews.date}</p>
                            <p className="flex-icon"><RateReviewIcon /> {selectedNews.category}</p>
                            <p className="flex-icon"><FavoriteIcon onClick={handleOnLike} />{like.length} </p>
                            <p className="flex-icon"><CommentIcon /> 14</p>
                        </div>
                        <h4>{selectedNews.short_desc}</h4>
                        <img src={selectedNews.coverImage} alt="" width="100%" />
                        <p>{selectedNews.desc}</p>
                        {selectedNews.images.length > 2 ? <div className={classes.wrap_imgs}>
                            {selectedNews.images.map((img, index, arr) => (
                                <img key={uuidv4()} className={classes.imgs} src={img} alt={selectedNews.title} />
                            ))}
                        </div> : selectedNews.images.map(img => <img key={selectedNews.id} src={img} />)}
                    </div>
                    <CommentsBox />
                </div>

                <Aside />
            </div>
        </div>
    );
}
export default NewsPage