import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import jsonwebtoken from "jsonwebtoken";
import BaseSelect from "react-select";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FixRequiredSelect from "./fixreqselect";

import "./evaluation.css";

const Select = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={props.options}
    value={props.value}
    onChange={props.onChange}
  />
);

export default class CreateEvaluationForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeInterviewedBy = this.onChangeInterviewedBy.bind(this);
    this.onChangeAcademicBackground = this.onChangeAcademicBackground.bind(
      this
    );
    this.onChangeIndustryExperience = this.onChangeIndustryExperience.bind(
      this
    );
    this.onChangeCurrentPosition = this.onChangeCurrentPosition.bind(this);
    this.onChangeCurrentEmployer = this.onChangeCurrentEmployer.bind(this);
    this.onChangeSkill1 = this.onChangeSkill1.bind(this);
    this.onChangeSkill2 = this.onChangeSkill2.bind(this);
    this.onChangeSkill3 = this.onChangeSkill3.bind(this);
    this.onChangeSkill4 = this.onChangeSkill4.bind(this);
    this.onChangeSkill5 = this.onChangeSkill5.bind(this);
    this.onChangeSkill6 = this.onChangeSkill6.bind(this);
    this.onChangeSkill7 = this.onChangeSkill7.bind(this);
    this.onChangeSkill8 = this.onChangeSkill8.bind(this);
    this.onChangeSkill9 = this.onChangeSkill9.bind(this);
    this.onChangeSkill10 = this.onChangeSkill10.bind(this);
    this.onChangeSkill11 = this.onChangeSkill11.bind(this);
    this.onChangeSkill12 = this.onChangeSkill12.bind(this);
    this.onChangeSkill13 = this.onChangeSkill13.bind(this);
    this.onChangeSkill14 = this.onChangeSkill14.bind(this);
    this.onChangeRate1 = this.onChangeRate1.bind(this);
    this.onChangeRate2 = this.onChangeRate2.bind(this);
    this.onChangeRate3 = this.onChangeRate3.bind(this);
    this.onChangeRate4 = this.onChangeRate4.bind(this);
    this.onChangeRate5 = this.onChangeRate5.bind(this);
    this.onChangeRate6 = this.onChangeRate6.bind(this);
    this.onChangeRate7 = this.onChangeRate7.bind(this);
    this.onChangeRate8 = this.onChangeRate8.bind(this);
    this.onChangeRate9 = this.onChangeRate9.bind(this);
    this.onChangeRate10 = this.onChangeRate10.bind(this);
    this.onChangeRate11 = this.onChangeRate11.bind(this);
    this.onChangeRate12 = this.onChangeRate12.bind(this);
    this.onChangeRate13 = this.onChangeRate13.bind(this);
    this.onChangeRate14 = this.onChangeRate14.bind(this);
    this.onChangeOverrallRating = this.onChangeOverrallRating.bind(this);
    this.onChangeSummary = this.onChangeSummary.bind(this);
    this.onChangeSalary1 = this.onChangeSalary1.bind(this);
    this.onChangeSalary2 = this.onChangeSalary2.bind(this);
    this.onChangeSalary3 = this.onChangeSalary3.bind(this);
    this.onChangeSalary4 = this.onChangeSalary4.bind(this);
    this.onChangePeriod1 = this.onChangePeriod1.bind(this);
    this.onChangePeriod2 = this.onChangePeriod2.bind(this);
    this.onChangeApprove = this.onChangeApprove.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      role: "",
      date: "",
      interviewedBy: "",
      academicBackground: "",
      industryExperience: "",
      currentPosition: "",
      currentEmployer: "",
      skill1: "",
      skill2: "",
      skill3: "",
      skill4: "",
      skill5: "",
      skill6: "",
      skill7: "",
      skill8: "",
      skill9: "",
      skill10: "",
      skill11: "",
      skill12: "",
      skill13: "",
      skill14: "",
      rate1: "",
      rate2: "",
      rate3: "",
      rate4: "",
      rate5: "",
      rate6: "",
      rate7: "",
      rate8: "",
      rate9: "",
      rate10: "",
      rate11: "",
      rate12: "",
      rate13: "",
      rate14: "",
      overrallRating: "",
      summary: "",
      salary1: "",
      salary2: "",
      salary3: "",
      salary4: "",
      period1: "",
      period2: "",
      approve: "",
      selectedinterviwerOption: "",
      snackbaropen: false,
      snackbarmsg: "",
      skilllist: [],
      rate1err: null,
      rate2err: null,
      rate3err: null,
      rate4err: null,
      rate5err: null,
      rate6err: null,
      rate7err: null,
      rate8err: null,
      rate9err: null,
      rate10err: null,
      rate11err: null,
      rate12err: null,
      rate13err: null
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }
  onChangeInterviewedBy(e) {
    this.setState({
      interviewedBy: e.target.value
    });
  }

  onChangeAcademicBackground(e) {
    this.setState({
      academicBackground: e.target.value
    });
  }
  onChangeIndustryExperience(e) {
    this.setState({
      industryExperience: e.target.value
    });
  }
  onChangeCurrentPosition(e) {
    this.setState({
      currentPosition: e.target.value
    });
  }
  onChangeCurrentEmployer(e) {
    this.setState({
      currentEmployer: e.target.value
    });
  }
  onChangeSkill1(e) {
    this.setState({
      skill1: e.target.value
    });
  }
  onChangeSkill2(e) {
    this.setState({
      skill2: e.target.value
    });
  }
  onChangeSkill3(e) {
    this.setState({
      skill3: e.target.value
    });
  }
  onChangeSkill4(e) {
    this.setState({
      skill4: e.target.value
    });
  }
  onChangeSkill5(e) {
    this.setState({
      skill5: e.target.value
    });
  }
  onChangeSkill6(e) {
    this.setState({
      skill6: e.target.value
    });
  }
  onChangeSkill7(e) {
    this.setState({
      skill7: e.target.value
    });
  }
  onChangeSkill8(e) {
    this.setState({
      skill8: e.target.value
    });
  }
  onChangeSkill9(e) {
    this.setState({
      skill9: e.target.value
    });
  }
  onChangeSkill10(e) {
    this.setState({
      skill10: e.target.value
    });
  }
  onChangeSkill11(e) {
    this.setState({
      skill11: e.target.value
    });
  }
  onChangeSkill12(e) {
    this.setState({
      skill12: e.target.value
    });
  }
  onChangeSkill13(e) {
    this.setState({
      skill13: e.target.value
    });
  }

  onChangeSkill14(e) {
    this.setState({
      skill14: e.target.value
    });
  }
  onChangeRate1(e) {
    this.setState(
      {
        rate1: e.target.value
      },
      () => {
        this.validater1();
      }
    );
    console.log("con chnage");
    console.log(e.target.value);
    this.findTotal();

    // var overallratesum =
    //   parseInt(e.target.value) +
    //   parseInt(this.state.rate2) +
    //   parseInt(this.state.rate3)
    //   // parseInt(this.state.rate4) +
    //   // parseInt(this.state.rate5) +
    //   // parseInt(this.state.rate6) +
    //   // parseInt(this.state.rate7) +
    //   // parseInt(this.state.rate8);

    // var overallrate = overallratesum / 8;
    // this.setState({ overrallRating: overallrate });
  }

  validater1 = () => {
    const { rate1 } = this.state;
    this.setState({
      rate1err:
        parseInt(rate1) >= 0 && parseInt(rate1) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };
  onChangeRate2(e) {
    this.findTotal();
    this.setState(
      {
        rate2: e.target.value
      },
      () => {
        this.validater2();
      }
    );
  }

  validater2 = () => {
    const { rate2 } = this.state;
    this.setState({
      rate2err:
        parseInt(rate2) >= 0 && parseInt(rate2) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };
  onChangeRate3(e) {
    this.findTotal();
    this.setState(
      {
        rate3: e.target.value
      },
      () => {
        this.validater3();
      }
    );
  }
  validater3 = () => {
    const { rate3 } = this.state;
    this.setState({
      rate3err:
        parseInt(rate3) >= 0 && parseInt(rate3) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };
  onChangeRate4(e) {
    this.findTotal();
    this.setState(
      {
        rate4: e.target.value
      },
      () => {
        this.validater4();
      }
    );
  }

  validater4 = () => {
    const { rate4 } = this.state;
    this.setState({
      rate4err:
        parseInt(rate4) >= 0 && parseInt(rate4) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeRate5(e) {
    this.findTotal();
    this.setState(
      {
        rate5: e.target.value
      },
      () => {
        this.validater5();
      }
    );
  }

  validater5 = () => {
    const { rate5 } = this.state;
    this.setState({
      rate5err:
        parseInt(rate5) >= 0 && parseInt(rate5) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };
  onChangeRate6(e) {
    this.findTotal();
    this.setState(
      {
        rate6: e.target.value
      },
      () => this.validater6()
    );
  }

  validater6 = () => {
    const { rate6 } = this.state;
    this.setState({
      rate6err:
        parseInt(rate6) >= 0 && parseInt(rate6) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeRate7(e) {
    this.findTotal();
    this.setState(
      {
        rate7: e.target.value
      },
      () => this.validater7()
    );
  }

  validater7 = () => {
    const { rate7 } = this.state;
    this.setState({
      rate7err:
        parseInt(rate7) >= 0 && parseInt(rate7) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeRate8(e) {
    this.findTotal();
    this.setState(
      {
        rate8: e.target.value
      },
      () => this.validater8()
    );
  }

  validater8 = () => {
    const { rate8 } = this.state;
    this.setState({
      rate8err:
        parseInt(rate8) >= 0 && parseInt(rate8) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeRate9(e) {
    this.findTotal();
    this.setState(
      {
        rate9: e.target.value
      },
      () => this.validater9()
    );
  }
  validater9 = () => {
    const { rate9 } = this.state;
    this.setState({
      rate9err:
        parseInt(rate9) >= 0 && parseInt(rate9) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeRate10(e) {
    this.findTotal();
    this.setState(
      {
        rate10: e.target.value
      },
      () => this.validater10()
    );
  }
  validater10 = () => {
    const { rate10 } = this.state;
    this.setState({
      rate10err:
        parseInt(rate10) >= 0 && parseInt(rate10) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeRate11(e) {
    this.findTotal();
    this.setState(
      {
        rate11: e.target.value
      },
      () => this.validater11()
    );
  }
  validater11 = () => {
    const { rate11 } = this.state;
    this.setState({
      rate11err:
        parseInt(rate11) >= 0 && parseInt(rate11) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeRate12(e) {
    this.findTotal();
    this.setState(
      {
        rate12: e.target.value
      },
      () => this.validater12()
    );
  }
  validater12 = () => {
    const { rate12 } = this.state;
    this.setState({
      rate12err:
        parseInt(rate12) >= 0 && parseInt(rate12) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeRate13(e) {
    this.findTotal();
    this.setState(
      {
        rate13: e.target.value
      },
      () => this.validater13()
    );
  }
  onChangeRate14(e) {
    this.findTotal();
    this.setState(
      {
        rate14: e.target.value
      },
      () => this.validater14()
    );
  }
  validater14 = () => {
    const { rate14 } = this.state;
    this.setState({
      rate14err:
        parseInt(rate14) >= 0 && parseInt(rate14) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };
  validater13 = () => {
    const { rate13 } = this.state;
    this.setState({
      rate13err:
        parseInt(rate13) >= 0 && parseInt(rate13) <= 5
          ? null
          : "value must be in range of 0 to 5"
    });
  };

  onChangeOverrallRating(e) {
    this.setState({
      overrallRating: e.target.value
    });
  }
  onChangeSummary(e) {
    this.setState({
      summary: e.target.value
    });
  }
  onChangeSalary1(e) {
    this.setState({
      salary1: e.target.value
    });
  }
  onChangeSalary2(e) {
    this.setState({
      salary2: e.target.value
    });
  }
  onChangeSalary3(e) {
    this.setState({
      salary3: e.target.value
    });
  }
  onChangeSalary4(e) {
    this.setState({
      salary4: e.target.value
    });
  }
  onChangePeriod1(e) {
    this.setState({
      period1: e.target.value
    });
  }
  onChangePeriod2(e) {
    this.setState({
      period2: e.target.value
    });
  }

  onChangeApprove(e) {
    this.setState({
      approve: e.target.value
    });
  }

  findTotal = () => {
    var arr = document.getElementsByName("qty");
    var tot = 0;
    var j = 0;
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      if (parseInt(arr[i].value)) {
        console.log("val - " + parseInt(arr[i].value));
        tot += parseInt(arr[i].value);
        j++;
      }
    }

    var avg = (tot / j).toFixed(2);
    console.log("avggg " + j);
    this.setState({ overrallRating: avg });
    // document.getElementById("total").value = tot;
  };

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Name : ${this.state.name}`);
    console.log(`Role :${this.state.role}`);
    console.log(`Date:${this.state.date}`);
    console.log(` InterviewedBy:${this.state.interviewedBy}`);
    console.log(` AcademicBackground:${this.state.academicBackground}`);
    console.log(` IndustryExperience:${this.state.industryExperience}`);
    console.log(` CurrentPosition:${this.state.currentPosition}`);
    console.log(` CurrentEmployer:${this.state.currentEmployer}`);
    console.log(` Skill1:${this.state.skill1}`);
    console.log(` Skill2:${this.state.skill2}`);
    console.log(` Skill3:${this.state.skill3}`);
    console.log(` Skill4:${this.state.skill4}`);
    console.log(` Skill5:${this.state.skill5}`);
    console.log(` Skill6:${this.state.skill6}`);
    console.log(` Skill7:${this.state.skill7}`);
    console.log(` Skill8:${this.state.skill8}`);
    console.log(` Skill9:${this.state.skill9}`);
    console.log(` Skill10:${this.state.skill10}`);
    console.log(` Skill11:${this.state.skill11}`);
    console.log(` Skill12:${this.state.skill12}`);
    console.log(` Skill13:${this.state.skill13}`);
    console.log(` Skill14:${this.state.skill14}`);
    console.log(` Rate1:${this.state.rate1}`);
    console.log(` Rate2:${this.state.rate2}`);
    console.log(` Rate3:${this.state.rate3}`);
    console.log(` Rate4:${this.state.rate4}`);
    console.log(` Rate5:${this.state.rate5}`);
    console.log(` Rate6:${this.state.rate6}`);
    console.log(` Rate7:${this.state.rate7}`);
    console.log(` Rate8:${this.state.rate8}`);
    console.log(` Rate9:${this.state.rate9}`);
    console.log(` Rate10:${this.state.rate10}`);
    console.log(` Rate11:${this.state.rate11}`);
    console.log(` Rate12:${this.state.rate12}`);
    console.log(` Rate13:${this.state.rate13}`);
    console.log(` Rate14:${this.state.rate14}`);
    console.log(` OverrallRating:${this.state.overrallRating}`);
    console.log(` Summary:${this.state.summary}`);
    console.log(` Salary1:${this.state.salary1}`);
    console.log(` Salary2:${this.state.salary2}`);
    console.log(` Salary3:${this.state.salary3}`);
    console.log(` Salary4:${this.state.salary4}`);
    console.log(` Period1:${this.state.period1}`);
    console.log(` Period2:${this.state.period2}`);
    console.log(` Approve:${this.state.approve}`);

    const newEvaluation = {
      name: this.state.name,
      role: this.state.role,
      candidateId: this.props.match.params.id,
      date: this.state.date,
      interviewedByName: this.state.interviewedBy,
      academicBackground: this.state.academicBackground,
      industryExperience: this.state.industryExperience,
      currentPosition: this.state.currentPosition,
      currentEmployer: this.state.currentEmployer,
      skill1: this.state.skill1,
      skill2: this.state.skill2,
      skill3: this.state.skill3,
      skill4: this.state.skill4,
      skill5: this.state.skill5,
      skill6: this.state.skill6,
      skill7: this.state.skill7,
      skill8: this.state.skill8,
      skill9: this.state.skill9,
      skill10: this.state.skill10,
      skill11: this.state.skill11,
      skill12: this.state.skill12,
      skill13: this.state.skill13,
      skill14: this.state.skill14,
      rate1: this.state.rate1,
      rate2: this.state.rate2,
      rate3: this.state.rate3,
      rate4: this.state.rate4,
      rate5: this.state.rate5,
      rate6: this.state.rate6,
      rate7: this.state.rate7,
      rate8: this.state.rate8,
      rate9: this.state.rate9,
      rate10: this.state.rate10,
      rate11: this.state.rate11,
      rate12: this.state.rate12,
      rate13: this.state.rate13,
      rate14: this.state.rate14,
      overrallRating: this.state.overrallRating,
      summary: this.state.summary,
      salary1: this.state.salary1,
      salary2: this.state.salary2,
      salary3: this.state.salary3,
      salary4: this.state.salary4,
      period1: this.state.period1,
      period2: this.state.period2,
      approve: this.state.selectedinterviwerOption.label,
      approveid: this.state.selectedinterviwerOption.value
    };

    // console.log("parms - " + this.p);
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .post(
        "http://localhost:3001/usr/evaluationadd/" + this.props.match.params.id,
        newEvaluation,
        config
      )
      .then(res => {
        console.log(res.data);

        if (res.data.msg === "sucsess") {
          this.setState({
            snackbaropen: true,
            snackbarmsg: "Evaluation succsessfull"
          });

          setTimeout(() => {
            this.props.history.push(
              "/getcandidate/" + this.props.match.params.id
            );
          }, 5000);
        }
      })
      .catch(err => console.log(err));

    this.setState({
      name: "",
      role: "",
      date: "",
      interviewedBy: "",
      academicBackground: "",
      industryExperience: "",
      currentPosition: "",
      currentEmployer: "",
      skill1: "",
      skill2: "",
      skill3: "",
      skill4: "",
      skill5: "",
      skill6: "",
      skill7: "",
      skill8: "",
      skill9: "",
      skill10: "",
      skill11: "",
      skill12: "",
      skill13: "",
      skill14: "",
      rate1: "",
      rate2: "",
      rate3: "",
      rate4: "",
      rate5: "",
      rate6: "",
      rate7: "",
      rate8: "",
      rate9: "",
      rate10: "",
      rate11: "",
      rate12: "",
      rate13: "",
      rate14: "",
      overrallRating: "",
      summary: "",
      salary1: "",
      salary2: "",
      salary3: "",
      salary4: "",
      period1: "",
      period2: "",
      approve: ""
    });
  }

  componentDidMount() {
    this.setState({ date: new Date().toISOString().substr(0, 10) });
    // document.getElementById("evaluationdate").valueAsDate = new Date();

    console.log("comp did mount");

    const id = this.props.match.params.id;
    console.log(id);

    const jwt = localStorage.getItem("jwt");
    //console.log("jwt token -- - -- >>>" + jwt);

    try {
      console.log("in register");
      var pay = jsonwebtoken.verify(jwt, "authdemo");
      // console.log("payload - " + pay);
      console.log("************************************");
    } catch (error) {
      console.log("not logged in redirecting...............");

      //e.preventDefault();
      this.props.history.push("/Login");
    }

    // var usertype = localStorage.getItem("usertype");

    // this.setState({ usertype: usertype });

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .get("/usr/basicuserdetails", config)
      .then(res => {
        console.log(res.data);
        var datain = res.data;

        var preurl = res.data.avatarUrl.slice(0, 48);
        var posturl = res.data.avatarUrl.slice(49, res.data.avatarUrl.length);
        var config = "/w_290,h_295,c_thumb/";

        var baseUrl = preurl + config + posturl;
        this.setState({ avatarUrl: baseUrl });

        // var resdate = this.state.data.date
        //  var alodate = this.state.data.allocatedDate
        //  var shrtdate = this.state.data.shortlistedDate

        this.setState({
          interviwerid: datain.id,
          interviewedBy: datain.firstName + " " + datain.lastName
        });
      })
      .catch(err => {});

    axios.get("/usr/getcandidate/" + id).then(res => {
      console.log("data candidate - -  - - - -" + JSON.stringify(res.data));

      res.data.candidateData.skills.map((ele, index) => {
        if (index == 0) {
          this.setState({
            skill1: ele.label
          });
        } else if (index == 1) {
          this.setState({
            skill2: ele.label
          });
        } else if (index == 2) {
          this.setState({
            skill3: ele.label
          });
        } else if (index == 3) {
          this.setState({
            skill4: ele.label
          });
        } else if (index == 4) {
          this.setState({
            skill5: ele.label
          });
        } else if (index == 5) {
          this.setState({
            skill6: ele.label
          });
        } else if (index == 6) {
          this.setState({
            skill7: ele.label
          });
        } else if (index == 7) {
          this.setState({
            skill8: ele.label
          });
        }
      });

      this.setState({
        name: res.data.candidateData.name,
        role: res.data.candidateData.jobspec,
        skilllist: res.data.candidateData.skills,
        userarr: res.data.userData
      });
    });

    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  }

  handleChangemodalselectscheduleinterviewinterviewer = selectedOption => {
    console.log(selectedOption);
    console.log("................");
    this.setState({ selectedinterviwerOption: selectedOption });
    console.log(this.state.selectedinterviwerOption);

    setTimeout(() => {
      console.log(this.state.selectedinterviwerOption.label);
    }, 1000);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  //add event construct for modern browsers or IE
  //which fires the callback with a pre-converted target reference
  addEvent = (node, type, callback) => {
    if (node.addEventListener) {
      node.addEventListener(
        type,
        function(e) {
          callback(e, e.target);
        },
        false
      );
    } else if (node.attachEvent) {
      node.attachEvent("on" + type, function(e) {
        callback(e, e.srcElement);
      });
    }
  };

  //identify whether a field should be validated
  //ie. true if the field is neither readonly nor disabled,
  //and has either "pattern", "required" or "aria-invalid"
  shouldBeValidated = field => {
    return (
      !(field.getAttribute("readonly") || field.readonly) &&
      !(field.getAttribute("disabled") || field.disabled) &&
      (field.getAttribute("pattern") || field.getAttribute("required"))
    );
  };

  //field testing and validation function
  instantValidation = field => {
    //if the field should be validated
    if (this.shouldBeValidated(field)) {
      //the field is invalid if:
      //it's required but the value is empty
      //it has a pattern but the (non-empty) value doesn't pass
      var invalid =
        (field.getAttribute("required") && !field.value) ||
        (field.getAttribute("pattern") &&
          field.value &&
          !new RegExp(field.getAttribute("pattern")).test(field.value));

      //add or remove the attribute is indicated by
      //the invalid flag and the current attribute state
      if (!invalid && field.getAttribute("aria-invalid")) {
        field.removeAttribute("aria-invalid");
      } else if (invalid && !field.getAttribute("aria-invalid")) {
        field.setAttribute("aria-invalid", "true");
      }
    }
  };

  //now bind a delegated change event
  //== THIS FAILS IN INTERNET EXPLORER <= 8 ==//
  //addEvent(document, 'change', function(e, target)
  //{
  //	instantValidation(target);
  //});

  //now bind a change event to each applicable for field

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <div style={{ marginTop: 20 }}>
            <h3 align="center">Auxenta Interview Evaluation Form</h3>
            <br />
            <form onSubmit={this.onSubmit}>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Name: </label>
                <div class="col-sm-10">
                  <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    class="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Role: </label>
                <div class="col-sm-10">
                  <input
                    placeholder="Role"
                    type="text"
                    size="75"
                    name="role"
                    class="form-control"
                    value={this.state.role}
                    onChange={this.onChangeRole}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Date:</label>
                <div class="col-sm-10">
                  <input
                    id="evaluationdate"
                    placeholder="Date"
                    type="Date"
                    size="75"
                    name="date"
                    class="form-control"
                    value={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Interviewed By: </label>
                <div class="col-sm-10">
                  <input
                    placeholder="Interviewed By"
                    type="text"
                    size="50"
                    name="interviewedBy"
                    class="form-control"
                    value={this.state.interviewedBy}
                    onChange={this.onChangeInterviewedBy}
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Academic Background : </label>
                <textarea
                  name="academicBackground"
                  class="form-control"
                  rows="3"
                  value={this.state.academicBackground}
                  onChange={this.onChangeAcademicBackground}
                />
              </div>
              <div class="form-group">
                <label>Industry Experience : </label>
                <textarea
                  name="industryExperience"
                  class="form-control"
                  rows="3"
                  value={this.state.industryExperience}
                  onChange={this.onChangeIndustryExperience}
                />
              </div>
              <div class="form-group">
                <label>Current position & period : </label>
                <textarea
                  name="currentPosition"
                  class="form-control"
                  rows="3"
                  value={this.state.currentPosition}
                  onChange={this.onChangeCurrentPosition}
                />
              </div>
              <div class="form-group">
                <label>Current Empolyer : </label>
                <textarea
                  name="currentEmployer"
                  class="form-control"
                  rows="3"
                  value={this.state.currentEmployer}
                  onChange={this.onChangeCurrentEmployer}
                />
              </div>
              <p>Technical skill set(Rate out of 5 & 5 is the high rate ) : </p>
              {this.state.skill1 && (
                <input
                  placeholder=""
                  type="text"
                  size="50"
                  name="skill1"
                  value={this.state.skill1}
                  onChange={this.onChangeSkill1}
                />
              )}
              {this.state.skill1 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate1}
                  onChange={this.onChangeRate1}
                  className={this.state.rate1err ? "errorratenumber" : ""}
                />
              )}
              {this.state.rate1err && (
                <span className="errorspanrate"> {this.state.rate1err} </span>
              )}
              {this.state.skill2 && (
                <input
                  placeholder=""
                  type="text"
                  name="skill2"
                  size="50"
                  value={this.state.skill2}
                  onChange={this.onChangeSkill2}
                />
              )}
              {this.state.skill2 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate2}
                  onChange={this.onChangeRate2}
                  className={this.state.rate2err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate2err && (
                <span className="errorspanrate"> {this.state.rate2err} </span>
              )}
              {this.state.skill3 && (
                <input
                  placeholder=""
                  type="text"
                  size="50"
                  name="skill3"
                  value={this.state.skill3}
                  onChange={this.onChangeSkill3}
                />
              )}
              {this.state.skill3 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate3}
                  onChange={this.onChangeRate3}
                  className={this.state.rate3err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate3err && (
                <span className="errorspanrate"> {this.state.rate3err} </span>
              )}
              {this.state.skill4 && (
                <input
                  placeholder=""
                  type="text"
                  name="skill4"
                  size="50"
                  value={this.state.skill4}
                  onChange={this.onChangeSkill4}
                />
              )}
              {this.state.skill4 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate4}
                  onChange={this.onChangeRate4}
                  className={this.state.rate4err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate4err && (
                <span className="errorspanrate"> {this.state.rate4err} </span>
              )}
              <br />
              {this.state.skill5 && (
                <input
                  placeholder=""
                  type="text"
                  size="50"
                  name="skill5"
                  value={this.state.skill5}
                  onChange={this.onChangeSkill5}
                />
              )}
              {this.state.skill5 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate5}
                  onChange={this.onChangeRate5}
                  className={this.state.rate5err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate5err && (
                <span className="errorspanrate"> {this.state.rate5err} </span>
              )}
              <br />
              {this.state.skill6 && (
                <input
                  placeholder=""
                  type="text"
                  size="50"
                  name="skill6"
                  value={this.state.skill6}
                  onChange={this.onChangeSkill6}
                />
              )}
              {this.state.skill6 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  required
                  name="qty"
                  value={this.state.rate6}
                  onChange={this.onChangeRate6}
                  className={this.state.rate6err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate6err && (
                <span className="errorspanrate"> {this.state.rate6err} </span>
              )}
              <br />
              {this.state.skill7 && (
                <input
                  placeholder=""
                  type="text"
                  name="skill7"
                  size="50"
                  value={this.state.skill7}
                  onChange={this.onChangeSkill7}
                />
              )}
              {this.state.skill7 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate7}
                  onChange={this.onChangeRate7}
                  className={this.state.rate7err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate7err && (
                <span className="errorspanrate"> {this.state.rate7err} </span>
              )}
              <br />
              {this.state.skill8 && (
                <input
                  placeholder=""
                  type="text"
                  name="skill8"
                  size="50"
                  value={this.state.skill8}
                  onChange={this.onChangeSkill8}
                />
              )}
              {this.state.skill8 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate8}
                  onChange={this.onChangeRate8}
                  className={this.state.rate9err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate8err && (
                <span className="errorspanrate"> {this.state.rate8err} </span>
              )}
              <br />
              {this.state.skill9 && (
                <input
                  placeholder=""
                  type="text"
                  name="skill9"
                  size="50"
                  value={this.state.skill9}
                  onChange={this.onChangeSkill9}
                />
              )}
              {this.state.skill9 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate9}
                  onChange={this.onChangeRate9}
                  className={this.state.rate9err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate9err && (
                <span className="errorspanrate"> {this.state.rate9err} </span>
              )}
              <br />
              {this.state.skill10 && (
                <input
                  placeholder=""
                  type="text"
                  name="skill10"
                  size="50"
                  value={this.state.skill10}
                  onChange={this.onChangeSkill10}
                />
              )}
              {this.state.skill10 && (
                <input
                  placeholder=""
                  type="number"
                  max="5"
                  min="0"
                  name="qty"
                  required
                  value={this.state.rate10}
                  onChange={this.onChangeRate10}
                  className={this.state.rate10err ? "errorratenumber" : ""}
                />
              )}{" "}
              {this.state.rate10err && (
                <span className="errorspanrate"> {this.state.rate10err} </span>
              )}
              <br />
              <br />
              {/* <p>Communication : </p> */}
              <input
                placeholder=""
                type="text"
                name="skill11"
                size="50"
                value="Communication"
                onChange={this.onChangeSkill11}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="qty"
                required
                value={this.state.rate11}
                onChange={this.onChangeRate11}
                className={this.state.rate11err ? "errorratenumber" : ""}
              />{" "}
              {this.state.rate11err && (
                <span className="errorspanrate"> {this.state.rate11err} </span>
              )}
              <br />
              <br />
              {/* <p>: </p> */}
              <input
                placeholder=""
                type="text"
                name="skill12"
                size="50"
                value="Leadership Skills"
                onChange={this.onChangeSkill12}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="qty"
                required
                value={this.state.rate12}
                onChange={this.onChangeRate12}
                className={this.state.rate12err ? "errorratenumber" : ""}
              />{" "}
              {this.state.rate12err && (
                <span className="errorspanrate"> {this.state.rate12err} </span>
              )}
              <br />
              <br />
              {/* <p>Team work: </p> */}
              <input
                placeholder=""
                type="text"
                name="skill13"
                size="50"
                value="Team work"
                onChange={this.onChangeSkill13}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="qty"
                required
                value={this.state.rate13}
                onChange={this.onChangeRate13}
                className={this.state.rate13err ? "errorratenumber" : ""}
              />{" "}
              {this.state.rate13err && (
                <span className="errorspanrate"> {this.state.rate13err} </span>
              )}
              <br />
              <br />
              {/* <p>Special Notes : </p>
              <input
                placeholder=""
                type="text"
                name="skill14"
                size="50"
                value={this.state.skill14}
                onChange={this.onChangeSkill14}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate14"
                value={this.state.rate14}
                onChange={this.onChangeRate14}
              /> */}
              <br />
              <br />
              <p>Overrall Rating</p>
              <input
                placeholder=""
                type="number"
                min="0"
                name="overrallRating"
                value={this.state.overrallRating}
                onChange={this.onChangeOverrallRating}
                disabled={true}
                className={this.state.rate14err ? "errorratenumber" : ""}
              />
              <br />
              <br />
              <div class="form-group">
                <label>Summary & Recomandation from the interviewer</label>
                <textarea
                  name="summary"
                  class="form-control"
                  rows="3"
                  value={this.state.summary}
                  onChange={this.onChangeSummary}
                />
              </div>
              <hr />
              <p>HR Report</p>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>Salary Expected : </label>
                  <input
                    type="Currency"
                    name="salary1"
                    class="form-control"
                    value={this.state.salary1}
                    onChange={this.onChangeSalary1}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label>Current Salary : </label>
                  <input
                    type="text"
                    name="salary2"
                    class="form-control"
                    value={this.state.salary2}
                    onChange={this.onChangeSalary2}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>Salary Band : </label>
                  <input
                    type="text"
                    name="salary3"
                    class="form-control"
                    value={this.state.salary3}
                    onChange={this.onChangeSalary3}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label>Agreed Salary : </label>
                  <input
                    type="text"
                    name="salary4"
                    class="form-control"
                    value={this.state.salary4}
                    onChange={this.onChangeSalary4}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>Notice period : </label>
                  <input
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    name="period1"
                    class="form-control"
                    value={this.state.period1}
                    onChange={this.onChangePeriod1}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label>Starting Date : </label>
                  <input
                    type="Date"
                    name="period2"
                    min={new Date().toISOString().slice(0, 10)}
                    class="form-control"
                    value={this.state.period2}
                    onChange={this.onChangePeriod2}
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Approved By : </label>
                <div class="col-sm-10">
                  <Select
                    options={this.state.userarr}
                    isSearchable
                    required
                    value={this.state.selectedinterviwerOption}
                    placeholder={this.state.selectedinterviwerOption.label}
                    onChange={
                      this.handleChangemodalselectscheduleinterviewinterviewer
                    }
                  />

                  {/* <Select
                    native
                    required
                    value={this.state.selectedinterviwerOption}
                    placeholder={this.state.selectedinterviwerOption.label}
                    onChange={
                      this.handleChangemodalselectscheduleinterviewinterviewer
                    }
                    options={this.state.userarr}
                  />{" "} */}
                </div>
              </div>
              <br />
              <br />
              <div className="form-group">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </div>
            </form>

            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              open={this.state.snackbaropen}
              autoHideDuration={6000}
              onClose={() => this.setState({ snackbaropen: false })}
              //onClose={this.handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">{this.state.snackbarmsg}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  //className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
