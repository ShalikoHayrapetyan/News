import { useState } from "react"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const AddCategoryForm = () => {
    const dispatch = useDispatch();
    let CategoryState =useSelector(state => state.pages.CategoryState)
    const classes = useStyles();
    const [categoryName, setcategoryName] = useState("")

    const addNewCategory = () =>{
        dispatch({
            type: 'addNewCategory',
            payload: {
                page :false      
            }
        });
    }

    return (
        <>
            <input
                type="text"
                value=""
                onChange={(e) => setcategoryName(e.target.value)}
            />

            <div className={classes.root}>
                <Button 
                variant="contained"
                 color="primary"
                 onClick={addNewCategory}
                 >
                    Add
      </Button>
            </div>

        </>



    )
}

export default AddCategoryForm