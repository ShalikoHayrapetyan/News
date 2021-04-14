import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    contain: {
        border: "1px solid gray",
        marginTop: '30px',
    },
    dialogbox: {
        display: "flex",
        width: "100%",
        marginBottom: 10,
        padding: 5
    },
    authorName: {
        paddingTop: 17,
        marginRight: 10

    },
    body: {
        position: "relative",
        width: "100%",
        height: 'auto',
        margin: "20px 10px",
        padding: "5px",
        backgroundColor: "#DADADA",
        borderRadius: "3px",
        border: "5px solid #ccc",
    },
    message: {
        minHeight: '30px',
        borderRadius: "3px",
        fontfamily: "Arial",
        fontSize: "14",
        lineHeight: '1.5',
        color: "#797979",
    },
    tip_left: {
        width: 0,
        height: 0,
        position: "absolute",
        background: "transparent",
        border: "10px solid #ccc",
        top: 10,
        left: -25,
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
        borderBottomColor: "transparent",
    }
}),
)


const CommentsBox = () => {
    const classes = useStyles();




    return (<div className={classes.contain}>
        <div className={classes.dialogbox}>
            <p className={classes.authorName}>AuthorName</p>
            <div className={classes.body}>
                <span className={classes.tip_left}> </span>
                <div className={classes.message}>
                    <span>I just made a comment abo</span>
                </div>
            </div>
        </div>

        <div className={classes.dialogbox}>
            <p className={classes.authorName}>AuthorName</p>
            <div className={classes.body}>
                <span className={classes.tip_left}> </span>
                <div className={classes.message}>
                    <span>I just made a comment  just made a comment  just made a comment  just made a comment abo</span>
                </div>
            </div>
        </div>

    </div >
    )
}

export default CommentsBox