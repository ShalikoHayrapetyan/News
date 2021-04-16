import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import Aside from "./Aside";
import { Redirect, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import newsSvc from "../services/newsSvc";
import { debounce } from "lodash";
import CommentsBox from "./CommentsBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "98%",
    height: 220,
  },
  wrap_imgs: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imgs: {
    width: "47%",
  },
}));

const NewsPage = () => {
  const classes = useStyles();

  let { newsId } = useParams();
  const allNewsData = useSelector((state) => state.fireBaseData.allNewsData);
  const localUserEmail = useSelector((state) => state.authReducer.adminEmail);

  const dispatch = useDispatch();
  const updateNewsLikedStatus = debounce(newsSvc.updateLikedState, 200);
  let selectedNews = allNewsData.find((news) => news.id === newsId);
  if (!selectedNews) return <Redirect to="/" />;

  let index = allNewsData.indexOf(selectedNews);
  let { like, id, comments } = selectedNews;
  const updateNews = () => {
    let newData = [...allNewsData];
    newData[index] = { ...selectedNews, like };

    dispatch({
      type: "likesData",
      payload: {
        data: newData,
      },
    });
    updateNewsLikedStatus(id, like);
  };

  const handleOnLike = () => {
    if (localUserEmail) {
      if (like.includes(localUserEmail)) {
        like = like.filter((name) => name !== localUserEmail);
      } else {
        like = [...like, localUserEmail];
      }
      updateNews();
    } else alert("Pleasa Sign in or Sign Up");
  };

  return (
    <div className="container">
      <div className="site-content">
        <div className="main">
          <div className="article-body">
            <h1>{selectedNews.title}</h1>
            <div className="article-body__head">
              <p className="flex-icon">
                <CalendarTodayIcon /> {selectedNews.date}
              </p>
              <p className="flex-icon">
                <RateReviewIcon /> {selectedNews.category}
              </p>
              <p className="flex-icon">
                <FavoriteIcon onClick={handleOnLike} />
                {like.length}{" "}
              </p>
              <p className="flex-icon">
                <CommentIcon />
                {comments.length}
              </p>
            </div>
            <h4>{selectedNews.short_desc}</h4>
            <img src={selectedNews.coverImage} alt="" width="100%" />
            <p>{selectedNews.desc}</p>
            {selectedNews.images.length > 2 ? (
              <div className={classes.wrap_imgs}>
                {selectedNews.images.map((img, index, arr) => (
                  <img
                    key={uuidv4()}
                    className={classes.imgs}
                    src={img}
                    alt={selectedNews.title}
                  />
                ))}
              </div>
            ) : (
              selectedNews.images.map((img) => (
                <img key={selectedNews.id} src={img} alt="" />
              ))
            )}

            <CommentsBox id={id} comments={comments} index={index} />
          </div>
        </div>

        <Aside />
      </div>
    </div>
  );
};
export default NewsPage;
