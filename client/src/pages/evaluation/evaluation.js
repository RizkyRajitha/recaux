import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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
      approve: ""
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
    this.setState({
      rate1: e.target.value
    });
  }
  onChangeRate2(e) {
    this.setState({
      rate2: e.target.value
    });
  }
  onChangeRate3(e) {
    this.setState({
      rate3: e.target.value
    });
  }
  onChangeRate4(e) {
    this.setState({
      rate4: e.target.value
    });
  }
  onChangeRate5(e) {
    this.setState({
      rate5: e.target.value
    });
  }
  onChangeRate6(e) {
    this.setState({
      rate6: e.target.value
    });
  }
  onChangeRate7(e) {
    this.setState({
      rate7: e.target.value
    });
  }
  onChangeRate8(e) {
    this.setState({
      rate8: e.target.value
    });
  }
  onChangeRate9(e) {
    this.setState({
      rate9: e.target.value
    });
  }
  onChangeRate10(e) {
    this.setState({
      rate10: e.target.value
    });
  }
  onChangeRate11(e) {
    this.setState({
      rate11: e.target.value
    });
  }
  onChangeRate12(e) {
    this.setState({
      rate12: e.target.value
    });
  }
  onChangeRate13(e) {
    this.setState({
      rate13: e.target.value
    });
  }
  onChangeRate14(e) {
    this.setState({
      rate14: e.target.value
    });
  }
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
      date: this.state.date,
      interviewedBy: this.state.interviewedBy,
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
      approve: this.state.approve
    };

    console.log("parms - " + this.p);

    axios
      .post(
        "http://localhost:3001/usr/evaluationadd/" + this.props.match.params.id,
        newEvaluation
      )
      .then(res => console.log(res.data));

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
              <input
                placeholder=""
                type="text"
                size="50"
                name="skill1"
                value={this.state.skill1}
                onChange={this.onChangeSkill1}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate1"
                value={this.state.rate1}
                onChange={this.onChangeRate1}
              />
              <br />

              <input
                placeholder=""
                type="text"
                name="skill2"
                size="50"
                value={this.state.skill2}
                onChange={this.onChangeSkill2}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate2"
                value={this.state.rate2}
                onChange={this.onChangeRate2}
              />
              <br />

              <input
                placeholder=""
                type="text"
                size="50"
                name="skill3"
                value={this.state.skill3}
                onChange={this.onChangeSkill3}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate3"
                value={this.state.rate3}
                onChange={this.onChangeRate3}
              />
              <br />

              <input
                placeholder=""
                type="text"
                name="skill4"
                size="50"
                value={this.state.skill4}
                onChange={this.onChangeSkill4}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate4"
                value={this.state.rate4}
                onChange={this.onChangeRate4}
              />
              <br />

              <input
                placeholder=""
                type="text"
                size="50"
                name="skill5"
                value={this.state.skill5}
                onChange={this.onChangeSkill5}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate5"
                value={this.state.rate5}
                onChange={this.onChangeRate5}
              />
              <br />

              <input
                placeholder=""
                type="text"
                size="50"
                name="skill6"
                value={this.state.skill6}
                onChange={this.onChangeSkill6}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate6"
                value={this.state.rate6}
                onChange={this.onChangeRate6}
              />
              <br />

              <input
                placeholder=""
                type="text"
                name="skill7"
                size="50"
                value={this.state.skill7}
                onChange={this.onChangeSkill7}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate7"
                value={this.state.rate7}
                onChange={this.onChangeRate7}
              />
              <br />

              <input
                placeholder=""
                type="text"
                name="skill8"
                size="50"
                value={this.state.skill8}
                onChange={this.onChangeSkill8}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate8"
                value={this.state.rate8}
                onChange={this.onChangeRate8}
              />
              <br />

              <input
                placeholder=""
                type="text"
                name="skill9"
                size="50"
                value={this.state.skill9}
                onChange={this.onChangeSkill9}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate9"
                value={this.state.rate9}
                onChange={this.onChangeRate9}
              />
              <br />

              <input
                placeholder=""
                type="text"
                name="skill10"
                size="50"
                value={this.state.skill10}
                onChange={this.onChangeSkill10}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate10"
                value={this.state.rate10}
                onChange={this.onChangeRate10}
              />
              <br />
              <br />
              <p>Communication : </p>
              <input
                placeholder=""
                type="text"
                name="skill11"
                size="50"
                value={this.state.skill11}
                onChange={this.onChangeSkill11}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate11"
                value={this.state.rate11}
                onChange={this.onChangeRate11}
              />
              <br />
              <br />

              <p>Leadership Skills: </p>
              <input
                placeholder=""
                type="text"
                name="skill12"
                size="50"
                value={this.state.skill12}
                onChange={this.onChangeSkill12}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate12"
                value={this.state.rate12}
                onChange={this.onChangeRate12}
              />
              <br />
              <br />

              <p>Team work: </p>
              <input
                placeholder=""
                type="text"
                name="skill13"
                size="50"
                value={this.state.skill13}
                onChange={this.onChangeSkill13}
              />
              <input
                placeholder=""
                type="number"
                max="5"
                min="0"
                name="rate13"
                value={this.state.rate13}
                onChange={this.onChangeRate13}
              />
              <br />
              <br />

              <p>Special Notes : </p>
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
              />
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
                    type="text"
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
                  <input
                    type="text"
                    name="approve"
                    required
                    class="form-control"
                    value={this.state.approve}
                    onChange={this.onChangeApprove}
                  />
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
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
