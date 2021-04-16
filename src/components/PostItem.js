import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import newsSvc from "../services/newsSvc";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 412,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  icons: {
    fontSize: "16px",
  },
  iconSVg: {
    marginRight: "8px",
  },
  shortTitle: {
    maxHeight: "52px",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  short: {
    maxHeight: "40px",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
}));

const updateNewsLikedStatus = debounce(newsSvc.updateLikedState, 200);

const PostItem = (props) => {
  let { title, short_desc, coverImage, like, date, id } = props.news;
  if (!coverImage.length) {
    coverImage =
      "https://static5.depositphotos.com/1006069/438/i/600/depositphotos_4381120-stock-photo-news.jpg";
  }
  const localUserEmail = useSelector((state) => state.authReducer.adminEmail);
  const allNewsData = useSelector((state) => state.fireBaseData.allNewsData);
  const dispatch = useDispatch();
  const classes = useStyles();

  const updateNews = () => {
    let index = allNewsData.indexOf(props.news);
    let newData = [...allNewsData];
    newData[index] = { ...props.news, like };
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
    <div className="article">
      <Card className={classes.root}>
        <Link to={`/news/${id}`} className="link-new">
          <CardHeader title={title} subheader={date} />
          <CardMedia className={classes.media} image={coverImage} title={id} />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.short}
            >
              {short_desc}
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing>
          <IconButton
            onClick={handleOnLike}
            aria-label="add to favorites"
            className={classes.icons}
          >
            <FavoriteIcon className={classes.iconSVg} />
            {like.length}
          </IconButton>
          <IconButton aria-label="comments" className={classes.icons}>
            <CommentIcon className={classes.iconSVg} />7
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostItem;
