import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);

  useEffect(() => {
    setChipData(props.currentskills);
    console.log(chipData);
  });

  return (
    <div >
      {chipData &&
        chipData.map(data => {
          return (
            <a href="#" class="badge badge-primary  sk">
              {data.label}
            </a>
          );
        })}
    </div>
  );
}
