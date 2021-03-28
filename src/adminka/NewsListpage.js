
import { useEffect, useState } from 'react';
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
    const classes = useStyles();
    const dispatch = useDispatch();


    let [allNewsData, setallNewsData] = useState("Please Wait")
    let [isDelete, setDelete] = useState("")
    useEffect(() => {
        db.collection("news")
            .get()
            .then((querySnapshot) => {
                const all = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    all.push(doc.data())
                });
                setallNewsData(all)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [isDelete])

    const delNewsInDb = (id) =>{
        db.collection("news").doc(id).delete().then(() => {
            setDelete(id)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    const startEdit = (id) => {
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
                                    image="/static/images/cards/contemplative-reptile.jpg"
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
                                <Button size="small" color="primary" onClick={() =>startEdit(el.id)} >
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