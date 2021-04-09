import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { db } from '../App';
import AddCategoryForm from './AddCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import LinearIndeterminate from './Loading';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },

}));

const Categorypage = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [isUnmounted, setIsUnmounted] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [isEditing, setisEditing] = useState(false)
    let [isDeleting, setisDeleting] = useState(false)

    let [editedName, setEditedName] = useState("")
    let [allCategoriesData, setallCategoriesData] = useState([])
    const [isLoding, setIsLoding] = useState(false)
    let categoryState = useSelector((state) => state.pages.categoryState)

    useEffect(() => () => setIsUnmounted(true), [])

    useEffect(() => {
        setIsLoding(true)
        db.collection("categories")
            .get()
            .then((querySnapshot) => {
                if (isUnmounted) return;
                const all = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    all.push(doc.data())
                });
                setallCategoriesData(all)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            }).finally(() => setIsLoding(false));

        return () => {
            console.log('aborting...');
        };
    }, [isEditing, categoryState, isDeleting])

    const editCategoryNameSaveBtn = (id) => {
        const washingtonRef = db.collection("categories").doc(id);
        return washingtonRef.update({
            title: editedName
        })
            .then(() => {
                console.log("Document successfully updated!");
                setisEditing(null)

            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }
    const delCategoryInDb = (id) => {
        db.collection("categories").doc(id).delete().then(() => {
            setisDeleting(!isDeleting)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

    }

    const editCategoryState = () => {
        dispatch({
            type: 'addNewCategory',
            payload: {
                page: true
            }
        });
    }

    return (
        <>
            <div className={classes.root}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        My categories
          </Typography>
                    <div className={classes.demo}>
                        <List dense={dense}>

                            {!isLoding ? allCategoriesData.map((el) => {
                                return (

                                    <ListItem key={el.title}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>

                                        { isEditing == el.id ? <div>
                                            <input
                                                type="text"
                                                onChange={(e) => setEditedName(e.target.value)}
                                                value={editedName}

                                            />
                                            <Button onClick={() => editCategoryNameSaveBtn(el.id)}>Save</Button>
                                        </div> : <><ListItemText
                                            primary={el.title}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />

                                            <ListItemSecondaryAction>
                                                <Button onClick={() => { setEditedName(el.title); setisEditing(el.id) }}>Edit</Button>
                                                <IconButton
                                                    onClick={() => delCategoryInDb(el.id)}
                                                    edge="end" aria-label="delete">
                                                    <DeleteIcon

                                                    />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </>
                                        }
                                    </ListItem>

                                )
                            }) : <LinearIndeterminate />
                            }
                        </List>
                    </div>
                </Grid>

            </div>


            {
                categoryState ? <AddCategoryForm /> : <div className={classes.root}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={editCategoryState}

                    >
                        Add new category
            </Button>
                </div>
            }



        </>
    )
}

export default Categorypage;