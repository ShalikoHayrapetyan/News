import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../App'
import { useHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactPlayer from "react-player"




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

const Addnewspage = () => {
    let history = useHistory()
    const classes = useStyles();
    const [isUnmounted, setIsUnmounted] = useState(false);
    const [errors, setErrors] = useState(null);
    const [title, setTitle] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [desc, setDesc] = useState("");
    const [images, setImages] = useState([]);
    const [coverImage, setCoverImage] = useState("")
    const [category, setCategory] = useState("")
    const [allCategoriesData, setallCategoriesData] = useState([])
    const [video, setVideo] = useState('')

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
                setallCategoriesData(all)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [])


    const validateForm = () => {
        let titleError = title.length < 5;
        let categoryError = !category;
        let shortDescError = shortDesc.length < 15;
        let descError = desc.length < 30;
        let error = titleError || categoryError || shortDescError || descError;
        if (error) {
            setErrors((oldState) => ({ ...oldState, titleError, categoryError, shortDescError, descError }))
        }
        else {
            setErrors(null);
        }
        return error;
    }

    const addNews = () => {
        if (!validateForm()) {
            let uniqId = uuidv4()
            db.collection("news").doc(uniqId).set({
                title: title,
                short_desc: shortDesc,
                desc: desc,
                id: uniqId,
                like: 0,
                coverImage: coverImage,
                images: images,
                date: new Date().toDateString(),
                category: category,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                video: video 

            }).then(() => {
                console.log("Document successfully written!");
                history.push(`/admin/newsList`)

            })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            setTitle("")
            setShortDesc("")
            setDesc("")
            setCategory("")
            setCoverImage("")
            setImages([])
            setVideo('')
        }

    }


    const chooseImages = (e) => {
        [...e.target.files].map((el) => {
            console.log(el)
            let imgFormat = el.type.split("/").pop()
            storage.ref()
                .child(`images/${uuidv4()}.${imgFormat}`)
                .put(el)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImages(prevState => ([...prevState, downloadURL]))
                    });
                });
        })
    }
    const coverImgUpload = (e) => {
        const imgFormat = e.target.files[0].type.split("/").pop()
        storage.ref()
            .child(`images/${uuidv4()}.${imgFormat}`)
            .put(e.target.files[0])
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setCoverImage(downloadURL)
                });
            });
    }

    const removeImg = (index) => {
        images.forEach((el, i) => {
            if (index === i) {
                images.splice(i, 1)
                setImages([...images])
            }
        })
    }

    const imagesList = (imgs) => {
        return imgs.map((itemSrc, i) => <span>
            <IconButton onClick={() => removeImg(i)} aria-label="delete" className={classes.margin}>
                <DeleteIcon />
            </IconButton>
            <img width="200" src={itemSrc} key={uuidv4()} />
        </span>)
    }

    const coverImageContainer = (img) => {
        if (coverImage.length > 1) {
            return (
                <span>
                    <IconButton onClick={() => setCoverImage("")} aria-label="delete" className={classes.margin}>
                        <DeleteIcon />
                    </IconButton>
                    <img width="300" src={coverImage} />
                </span>)
        }

    }

    return (
        <div className="add-news">
            <h2 className="h2">Add new post</h2>

            <FormControl variant="outlined" className={classes.formControl} fullWidth style={{ margin: 15 }}>
                <InputLabel htmlFor="outlined-age-native-simple">New categories</InputLabel>
                <Select
                    native
                    value={category}
                    error={errors?.categoryError}
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
                error={errors?.titleError}
                helperText={errors?.titleError ? "Text must be more than 5 simbols" : null}
                style={{ margin: 15 }}
                placeholder="Type news title"
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
                error={errors?.shortDescError}
                helperText={errors?.shortDescError ? "Text must be more than 15 simbols" : null}
                fullWidth
                multiline
                style={{ margin: 15 }}
                rows={4}
                placeholder="Type short description"
                variant="outlined"
            />

            <TextField
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                id="outlined-multiline-static"
                label="Description"
                error={errors?.descError}
                helperText={errors?.descError ? "Text must be more than 30 simbols" : null}
                fullWidth
                multiline
                style={{ margin: 15 }}
                rows={14}
                placeholder="Type main description"
                variant="outlined"
            />

            <div className={classes.root}>
                <input
                    onChange={coverImgUpload}
                    accept="image/*"
                    name={coverImage}
                    className={classes.input}
                    id="coverImg"
                    type="file"
                />
                <label htmlFor="coverImg">
                    <Button variant="contained" color="primary" component="span">Upload</Button>  Cover img
                </label>
                <div>{coverImageContainer(coverImage)}</div>


            </div>

            <div className={classes.root}>
                <input
                    onChange={chooseImages}
                    accept="image/*"
                    name={images}
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">Upload</Button> images
                </label>
                <div>{imagesList(images)}</div>

            </div>

            <div>
            <TextField
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                id="outlined-full-width"
                label="Video URL"
                error={errors?.titleError}
                helperText={errors?.titleError ? "Text must be more than 5 simbols" : null}
                style={{ margin: 15 }}
                placeholder="Type news title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
      <ReactPlayer
        url={video}
      />
      </div>      


            <div className="save-btn">
                <Button
                    onClick={addNews}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >Save</Button>
            </div>
        </div>
    )
}


export default Addnewspage;