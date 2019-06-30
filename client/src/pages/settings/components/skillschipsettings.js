import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
//import _ from "lodash";
import axios from "axios";
import "./settingsskills.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  progress: {
    margin: theme.spacing(1)
  }
}));

export default function ChipsArray(props) {
  // const [selectedOption, setselectedOption] = useState({});
  // const [selectoptionsnamelist, setselectoptionsnamelist] = useState([]);
  const [newSkill, setnewSkill] = useState(""); //errorskill
  const [errorskill, seterrorskill] = useState(false);
  const [onload, setonload] = useState(false);
  const classes = useStyles(); //onload
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
    setonload(true);
    axios
      .post("/usr/deletenewskill", chipToDelete, config)
      .then(res => {
        console.log(res.data);
        setonload(false);
        //setselectoptionsnamelist(res.data.skills);
      })
      .catch(err => {});
  };

  const hndleskillchange = e => {
    // console.log(e.target.value);
    setnewSkill(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.charCode == 13) {
      addskill();
    }
  };

  const addskill = () => {
    var jar = chipData
      .map(function(e) {
        return e.label;
      })
      .indexOf(newSkill);
    if (jar < 0) {
      seterrorskill(false);
      setChipData(chips => [
        ...chipData,
        { key: chipData.length, label: newSkill }
      ]);

      var jwt = localStorage.getItem("jwt");

      var config = {
        headers: {
          authorization: jwt
        }
      };

      //console.log(this.state);
      setonload(true);
      axios
        .post("/usr/addnewskill", { skill: newSkill }, config)
        .then(res => {
          console.log(res.data);
          setonload(false);
          document.getElementsByClassName("settingsaddskill").value = "";

          //this.setState({ skillset: res.data.skills });
          //this.forceUpdate();
          //setselectoptionsnamelist(res.data.skills);
        })
        .catch(err => {});
    } else {
      seterrorskill(true);
    }
  };

  return (
    <Container>
      <TextField
        id="outlined-dense"
        label="New skill"
        //className={clsx(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
        type="text"
        onChange={hndleskillchange}
        onKeyPress={handleKeyPress}
        className="settingsaddskill"
      />

      <Button
        id={!onload?"settingsaddskillbtn":"settingsaddskillbtnonload"}
        variant="contained"
        color="primary"
        onClick={addskill}
      >
        add
      </Button>
      <CircularProgress
        id="settingsloadingspinner"
        hidden={!onload}
        className={classes.progress}
      />
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
    </Container>
  );
}
