import { red } from "@material-ui/core/colors";

const orange = "#F2A74B";
const textLight = "#eaf2f4";
const textDark = "#0D0D0D";

export const register = (theme) => ({
  main: {
    position: "fixed",
    left: "0",
    top: "0",
    background: "rgba(0,0,0, .7)",
    width: "100%",
    height: "100%",
    display: "block",
    zIndex: "99",
  },
  paper: {
    maxWidth: "450px",
    minWidth: "340px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate3d(-50%, -50%, 0)",
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",

    "&:hover": {
      boxShadow: "0px 24px 36px rgba(131,153,167,0.99)",
    },
  },
  avatar: {
    marginTop: 20,
    position: "relative",
    background: "rgba(255,255,255,0.85)",
    width: "100px",
    height: "100px",
    boxShadow: "0px 0px 12px rgba(131,153,167,0.99)",
  },

  icon: {
    width: "80px",
    height: "80px",
    color: "rgba(131,153,167,0.79)",
  },

  form: {
    margin: "0 30px 60px",
  },
  labels: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    fontSize: "16px",
    lineHeight: "5px",
    fontFamily: "PT Mono, monospace",
    fontWeight: 300,
    opacity: 0.45,
    color: `${textDark} !important`,
  },

  inputs: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily: "Cutive Mono, monospace",
    color: textDark,
    fontSize: "14px",
    padding: "10px",
    borderRadius: "8px",
    border: "1.4px solid",
    boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
    borderColor: "#3f51b5",

    "&:hover": {
      background: "rgba(169,198,217,0.36457423) ",
    },
  },

  button: {
    color: "#3f51b5",
    border: "1px solid #3f51b5",
    position: "relative",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    overflow: "hidden",
    marginTop: "30px",
    padding: "10px",
    borderRadius: "8px",
    letterSpacing: "3px",

    "&::before, &::after": {
      position: "absolute",
      content: '""',
      boxSizing: "border-box",
      borderRadius: "8px",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 1,
    },
    "&::before": {
      borderBottom: "2px solid rgba(255,255,255,.58)",
      borderTop: "2px solid rgba(255,255,255,.58)",
      transform: "scale(0,1)",
    },
    "&::after": {
      borderLeft: "3px solid rgba(255,255,255,.58)",
      borderRight: "3px solid rgba(255,255,255,.58)",
      transform: "scale(1,0)",
    },
    "&:hover::before": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s",
    },
    "&:hover::after": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s",
    },
    "&::first-letter": {
      color: orange,
    },
    "&:hover": {
      background: "rgba(169,198,217,0.8)",
      color: textLight,
    },
  },
  error: {
    border: `1.2px solid ${red[900]} `,
    background: "rgba(169,198,217,0.29457423)",
    color: red[900],
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: "-15px",
    minWidth: "300px",
    padding: "0 10px",
    lineHeight: "1.2",
  },

  passwordEye: {
    color: "rgba(131,153,167,0.9)",
    opacity: 0.7,
  },
});
