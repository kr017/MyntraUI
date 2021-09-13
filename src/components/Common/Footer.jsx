import { makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#FAFBFC",
    padding: "30px 0px 40px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    marginTop: "4px",
  },
  link: {
    textDecoration: "none",
    margin: "0px 4px",
  },
}));

export function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        This is made for educational purpose only and design is inspired by
        <a href="https://www.myntra.com/" className={classes.link}>
          Myntra.
        </a>
        Images used here are taken from
        <a href="https://unsplash.com/" className={classes.link}>
          Unsplash
        </a>{" "}
      </div>

      <div className={classes.content}>
        Made with <FavoriteIcon htmlColor="#ff3f6ccc" fill />
        by{" "}
        <a href="https://linktr.ee/kiranmate" className={classes.link}>
          Kiran Mate
        </a>{" "}
      </div>
    </div>
  );
}
