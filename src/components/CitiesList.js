import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((them) => ({
  container: {},
  header: {
    padding: "30px 0",
    textAlign: "center",
  },
  savedCities: {
    padding: "0px 100px 0",
    flexWrap: "wrap",
  },
  listItem: {
    height: 150,
    border: "1px solid grey",
    marginRight: 50,
    flex: "0 1 15%",
    marginTop: 30,
    "&:hover": {
      boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
    },
  },
  deleteButton: {
    "&:hover": {
      boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
    },
  },
  cardText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  },
}));

export const CitiesList = ({
  setSelectedCity,
  setSavedCities,
  savedCities,
  clearCity,
}) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10}>
        <Typography variant="h5" component="h5" className={classes.header}>
          Saved cities
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.savedCities}
        >
          {savedCities.map((card, index) => (
            <Grid
              item
              key={index}
              className={classes.listItem}
              onClick={() => card.name && setSelectedCity(card.name)}
            >
              <Grid container justifyContent="flex-end">
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "black" }}
                  className={classes.deleteButton}
                  onClick={clearCity(index)}
                />
              </Grid>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} className={classes.cardText}>
                  <span>{card.name}</span>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
