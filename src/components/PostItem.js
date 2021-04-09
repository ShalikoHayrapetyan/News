import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    icons: {
        fontSize: '16px',
    },
    iconSVg: {
        marginRight: '8px',
    }
}));

const PostItem = (props) => {
   const {title, short_desc, coverImage, like, date, }=props.news
   console.log(props)
    const classes = useStyles();

    return (
        <div className="article">
            <Card className={classes.root}>
                <CardHeader
                    title={title}
                    subheader={date}
                />
                <CardMedia
                    className={classes.media}
                    image={coverImage}
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {short_desc}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing >
                    <IconButton aria-label="add to favorites" className={classes.icons}>
                        <FavoriteIcon className={classes.iconSVg} />{like}
                    </IconButton>
                    <IconButton aria-label="comments" className={classes.icons}>
                        <CommentIcon className={classes.iconSVg} />7
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )

}

export default PostItem;