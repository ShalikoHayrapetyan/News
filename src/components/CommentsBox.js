import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newsSvc from "../services/newsSvc";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  contain: {
    width: "100%",
    marginTop: 40,
  },
  dialogbox: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 20,
  },
  authorName: {
    paddingTop: 5,
    margin: "0 0 15px",
    width: "100%",
    color: "#3f51b5",
    fontSize: 20,
  },
  body: {
    position: "relative",
    width: "100%",
    height: "auto",
    margin: "0 0 0",
    padding: "5px",
    backgroundColor: "#DADADA",
    borderRadius: "3px",
    border: "5px solid #ccc",
  },
  message: {
    minHeight: "30px",
    borderRadius: "3px",
    fontfamily: "Arial",
    fontSize: "14",
    lineHeight: "1.5",
    color: "#797979",
  },
  tip_left: {
    width: 0,
    height: 0,
    position: "absolute",
    background: "transparent",
    border: "10px solid #ccc",
    top: -25,
    left: 5,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: "rotate(90deg)",
  },
  comment_form: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: 120,
    fontSize: 16,
  },
  send_btn: {
    margin: "8px 0 0 auto",
    width: 150,
    height: 40,
  },
  time: {
    float: "right",
    margin: "8px 0 0 0",
    color: "gray",
    fontSize: "14px",
  },
  text: {
    color: "black",
  },
}));

const CommentsBox = (props) => {
  const { id, comments, index } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const localUserName = useSelector((state) => state.authReducer.adminName);

  const handleOnBtn = () => {
    if (localUserName) {
      if (text) {
        let today = new Date();
        let date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        let dateTime = date + " " + time;
        const comment = {
          text,
          author: localUserName,
          dateTime,
        };
        const commentsData = [...comments, comment];
        dispatch({
          type: "CommentsData",
          payload: {
            index,
            commentsData,
          },
        });
        newsSvc.updateCommentsData(id, commentsData);
        setText("");
      }
    } else alert("Please Sign in or Sign up");
  };

  return (
    <div className={classes.contain}>
      <div className={classes.comment_form}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={classes.textarea}
          placeholder="Comments text"
        />
        <button onClick={handleOnBtn} className={classes.send_btn}>
          Send
        </button>
      </div>
      {comments.length
        ? comments.map((com) => (
            <div key={uuidv4()} className={classes.dialogbox}>
              <p className={classes.authorName}>{com.author}</p>
              <div className={classes.body}>
                <span className={classes.tip_left}> </span>
                <div className={classes.message}>
                  <span className={classes.text}>{com.text}</span>
                </div>
                <p className={classes.time}> {com.dateTime}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default CommentsBox;
