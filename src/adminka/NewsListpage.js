
import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import { db } from '../App';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Addnewspage from './Addnewspage';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import LinearIndeterminate from './Loading';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    btnDiv: {
        justifyContent: "space-between"
    },
    cardList: {
        display: "flex"
    }
});

const NewsListpage = () => {
    let history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch();
    let [allNewsData, setallNewsData] = useState(  <LinearIndeterminate />)
    let [isDeleting, setisDeleting] = useState(false)
    const [isUnmounted, setIsUnmounted] = useState(false);
    useEffect(() => () => setIsUnmounted(true), [])

    useEffect(() => {
        db.collection("news")
            //.orderBy("timestamp")
            //.limit(3)
            .get()
            .then((querySnapshot) => {
                if (isUnmounted) return
                const all = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    all.push(doc.data())
                });
                setallNewsData(all.reverse())
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }, [isDeleting,])

    const delNewsInDb = (id) => {
        db.collection("news").doc(id).delete().then(() => {
            setisDeleting(!isDeleting)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    const startEdit = (id) => {

        history.push(`/admin/editNews`);
        dispatch({
            type: 'editingNews',
            payload: {
                id,
            }
        });
    }
    
    return (
        <>
            <div className={classes.cardList}>
                {Array.isArray(allNewsData) ? allNewsData.map((el) => {
                    return (

                        <Card className={classes.root} key={el.id}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={el.title}
                                    height="140"
                                    image={el.image}
                                    title={el.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {el.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {el.short_desc}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.btnDiv}>
                                <Button size="small" color="primary" onClick={() => startEdit(el.id)} >
                                    Edit
                                    </Button>
                                <Button size="small" color="secondary" onClick={() => delNewsInDb(el.id)} >
                                    Delete
              </Button>
                            </CardActions>
                        </Card>

                    )

                })
                    : allNewsData}
            </div>
        </>
    )

}


export default NewsListpage;