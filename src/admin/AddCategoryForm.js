import { useState } from "react"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../App";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const AddCategoryForm = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [categoryName, setcategoryName] = useState("")

    const addNewCategory = () =>{

        let uniqId=uuidv4()
        db.collection("categories").doc(uniqId).set({
            title: categoryName,
            id: uniqId,
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        dispatch({
            type: 'addNewCategory',
            payload: {
                page :false      
            }
        });
    }

    return (
        <>
           <h2>Write category name</h2>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setcategoryName(e.target.value)}
            />

            <div className={classes.root}>
             
                <Button 
                placeholder="Category name"
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