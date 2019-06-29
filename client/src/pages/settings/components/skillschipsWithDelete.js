import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import axios from "axios";

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
  // const [selectedOption, setselectedOption] = useState({});
  // const [selectoptionsnamelist, setselectoptionsnamelist] = useState([]);
  const classes = useStyles();
  const [chipData, setChipData] = useState(props.currentskills);

  // useEffect(() => {
  // console.log("props - - -");
  // console.log(props.currentskills);
  //setChipData(props.currentskills);

  // }, []);

  // selectedOption: null,
  //   selectoptionsnamelist: [],

  // const handleChangemodalselect = selectedOption => {
  //   setselectedOption(selectedOption);
  //   var dup = true;
  //   chipData.forEach((element, index) => {
  //     if (element.label === selectedOption.label) {
  //       console.log("dup " + index);
  //       dup = false;
  //     } else {
  //       //dup = true;
  //     }
  //   });

  //   if (dup) {
  //     setChipData(chips => [
  //       ...chipData,
  //       { key: selectedOption.value, label: selectedOption.label }
  //     ]);

  //     console.log(`Option selected:`, selectedOption);

  //     var jwt = localStorage.getItem("jwt");

  //     var config = {
  //       headers: {
  //         authorization: jwt
  //       }
  //     };

  //     axios
  //       .post("/usr/addskill/" + props.id, selectedOption, config)
  //       .then(res => {
  //         console.log(res.data.skills);
  //         setChipData(res.data.skills);
  //         //setselectoptionsnamelist(res.data.skills);
  //       })
  //       .catch(err => {});
  //   }
  // };

  const handleDelete = chipToDelete => () => {
    console.log(chipToDelete);

    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/deletenewskill", chipToDelete, config)
      .then(res => {
        console.log(res.data);
        //setselectoptionsnamelist(res.data.skills);
      })
      .catch(err => {});
  };

  return (
    <div>
      {/* <Select
        value={selectedOption}
        onChange={handleChangemodalselect}
        options={selectoptionsnamelist}
      /> */}
      <Divider variant="inset" component="li" />
      <Paper className={classes.root}>
        {chipData.map(data => {
          return (
            <Chip
              key={data.key}
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </Paper>
    </div>
  );
}
