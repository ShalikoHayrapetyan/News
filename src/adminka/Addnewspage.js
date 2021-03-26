import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

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
    const classes = useStyles();

    return (
        <div className="add-news">
            <h2 className="h2">Add new post</h2>

            <FormControl variant="outlined" className={classes.formControl} fullWidth style={{ margin: 15 }}>
                <InputLabel htmlFor="outlined-age-native-simple">New categories</InputLabel>
                <Select
                    native
                    /*value={state.age}
                    onChange={handleChange}*/
                    label="New categories"
                    inputProps={{
                        name: 'age',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={1}>Sport</option>
                    <option value={2}>Politics</option>
                    <option value={3}>Medicine</option>
                    <option value={4}>Business</option>
                </Select>
            </FormControl>

            <TextField
                id="outlined-full-width"
                label="Title"
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
                id="outlined-multiline-static"
                label="Short description"
                fullWidth
                multiline
                style={{ margin: 15 }}
                rows={4}
                placeholder="Type short description"
                variant="outlined"
            />

            <TextField
                id="outlined-multiline-static"
                label="Description"
                fullWidth
                multiline
                style={{ margin: 15 }}
                rows={14}
                placeholder="Type main description"
                variant="outlined"
            />

            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">Upload</Button> choose image
                </label>
            </div>

            <div className="save-btn">
                <Button
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