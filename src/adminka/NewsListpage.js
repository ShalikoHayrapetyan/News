
import { useEffect, useState } from 'react';
import { db } from '../App';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import LinearIndeterminate from './Loading';

const useStyles = makeStyles({
    root: {
        //maxWidth: 345,
        flex: "0 0 230px",
        margin: "0 14px 20px 0",
        position: 'relative',
        paddingBottom: '50px',
    },
    btnDiv: {
        justifyContent: "space-between",
        position: 'absolute',
        bottom: '0',
        width: "100%",

    },
    cardList: {
        display: "flex",
        flexWrap: "wrap",
    },
    title_h1: {
        fontSize: "24px",
        color: "#999",
        marginTop: '0',
    }
});

const NewsListpage = () => {
    let history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch();
    const [allNewsData, setallNewsData] = useState([])
    const [isLoding, setIsLoding] = useState(false)
    const [category, setCategory] = useState("")
    const [allCategoriesData, setallCategoriesData] = useState([])
    let [isDeleting, setisDeleting] = useState(false)
    const [isUnmounted, setIsUnmounted] = useState(false);
    useEffect(() => () => setIsUnmounted(true), [])

    useEffect(() => {

        db.collection("categories")
            .get()
            .then((querySnapshot) => {
                if (isUnmounted) return;
                const all = []
                querySnapshot.forEach((doc) => {
                    all.push(doc.data())
                });
                setallCategoriesData([...all])
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        setIsLoding(true)
        db.collection("news")
            .orderBy("timestamp")
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
            }).finally(() => setIsLoding(false));

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
            <h1 className={classes.title_h1}>{allNewsData.length} - news in page</h1>

            <FormControl variant="outlined" className={classes.formControl} fullWidth style={{ margin: "0px 0px 20px 0px" }}>
                <InputLabel htmlFor="outlined-age-native-simple">News categories</InputLabel>
                <Select
                    native
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="New categories"
                    inputProps={{
                        name: 'category',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {
                        allCategoriesData.map((cat) => <option key={cat.id} value={cat.title}>{cat.title}</option>)
                    }
                </Select>
            </FormControl>

            <div className={classes.cardList}>
                {!isLoding ? allNewsData.filter(el => {
                    if (category === "") return true
                    return el.category == category
                }).map((el) => {
                    return (

                        <Card className={classes.root} key={el.id}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={el.title}
                                    height="140"
                                    image={el.coverImage}
                                    title={el.id}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {el.title}
                                    </Typography>
                                    {/*<Typography variant="body2" color="textSecondary" component="p">
                                        {el.short_desc}
                                    </Typography>*/}
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
                    : <LinearIndeterminate />}
            </div>
        </>
    )

}


export default NewsListpage;