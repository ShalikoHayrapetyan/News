import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../App'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Editnews = () => {
    const { editNewsId } = useSelector(state => state.pages);
    const classes = useStyles();
    const [data, setData] = useState({})
    const [title, setTitle] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("")
    const [allCategoriesData, setallCategoriesData] = useState([])
    let history = useHistory()

    useEffect(() => {
        db.collection("categories")
            .get()
            .then((querySnapshot) => {
                const all = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    all.push(doc.data())
                });
                setallCategoriesData(all)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        db.collection("news").where("id", "==", editNewsId)

            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setData(doc.data())
                    setTitle(doc.data().title)
                    setShortDesc(doc.data().short_desc)
                    setDesc(doc.data().desc)
                    setCategory(doc.data().category)
                    setImage(doc.data().image)
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }, [])

    const updateNews = () => {

        const washingtonRef = db.collection("news").doc(data.id);
        return washingtonRef.update({
            title,
            short_desc: shortDesc,
            desc,
            category,
            image
        })
            .then(() => {
                console.log("Document successfully updated!");
                history.push(`/admin/newsList`)

            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }
    const imgHandleUpload = (e) => {
        const imgFormat = e.target.files[0].type.split("/").pop()
        storage.ref()
            .child(`images/${uuidv4()}.${imgFormat}`)
            .put(e.target.files[0])
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL)
                    setImage(downloadURL)
                });
            });
    }
 console.log(category.doc)

    return (

        <div className="add-news">
            <h2 className="h2">Edit post</h2>

            <FormControl variant="outlined" className={classes.formControl} fullWidth style={{ margin: 15 }}>
                <InputLabel htmlFor="outlined-age-native-simple">New categories</InputLabel>
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

            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="outlined-full-width"
                label="Title"
                style={{ margin: 15 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />

            <TextField
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                id="outlined-multiline-static"
                label="Short description"
                fullWidth
                multiline
                style={{ margin: 15 }}
                rows={4}
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                id="outlined-multiline-static"
                label="Description"
                fullWidth
                multiline
                style={{ margin: 15 }}
                rows={14}
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <div className={classes.root}>
                <input
                    onChange={imgHandleUpload}
                    accept="image/*"
                    name={image}
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">

                    <Button variant="contained" color="primary" component="span">Upload</Button> choose image
                </label>
                <img width="300" src={image} />
            </div>

            <div className="save-btn">
                <Button
                    onClick={updateNews}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >Update News</Button>
            </div>
        </div>
    )
}

export default Editnews