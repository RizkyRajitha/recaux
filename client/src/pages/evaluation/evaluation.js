import React, { Component } from "react";
import "./evaluation.css";

const axios = require("axios");

class evaluation extends Component {
  state = {
    name: "",
    jobspec: "",
    status: "",
    success_added_flag: false,
    evaluatorId:String,
    candidateId:String,
    evaluationMarks:Number,
    acadamicBackground:String,
    indusrtyExperiance:String,
    currentPosition:String,
    JobPeriod:String,
    data:[]
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    this.setState({candidateId:id})
    const userid = localStorage.getItem('userId');
    console.log(userid)
    this.setState({evaluatorId:userid})


    axios
    .get("/usr/getcandidate/" + id)
    .then(res => {
      this.setState({ data: res.data });
      console.log(res);
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
    });

  }

  submithndler = (e) => {
    e.preventDefault();

    console.log(this.state)


    const id = this.props.match.params.id;

    var payload={
      evaluatorId:this.state.evaluatorId,
      candidateId:this.state.candidateId,
    evaluationMarks:this.state.evaluationMarks,
    acadamicBackground:this.state.acadamicBackground,
    indusrtyExperiance:this.state.indusrtyExperiance,
    currentPosition:this.state.currentPosition,
    JobPeriod:this.state.JobPeriod
    }

    console.log(payload)

    axios
      .post("/usr/evaluation/" + id,  payload )
      .then(res => {
        console.log(res)
        this.setState({ success_added_flag: true });
      })
      .catch(err => {
        console.log(err);
      });

    //   this.props.history.push('/getcandidate/'+id)
  };
  chngehandl = e => {
    //console.log(e.target.name,)
    this.setState({ [e.target.name]: e.target.value });

    console.log(this.state);
  };

  chngehandlsel = e=>{
    this.setState({ status: e.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <div className="eval">
        <form onSubmit={this.submithndler}>
          <br />
          <br />
          <br />

          <h6> name : {this.state.data.name}</h6>
              <h6> email : {this.state.data.email}</h6>
              <h6> job spec : {this.state.data.jobspec}</h6>


          <div className="form-group">
            <input
              type="text"
              name="acadamicBackground"
              className="form-control"
              onChange={this.chngehandl}
              placeholder="enter candidate acadamicBackground "
              id="name"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="evaluationMarks"
              className="form-control"
              placeholder="enter candidate marks"
              onChange={this.chngehandl}
              id="evaluationMarks"
            />
          </div>
          <div className="form-group">
            <label> </label>
            <input
              type="text"
              name="indusrtyExperiance"
              className="form-control"
              placeholder="enter candidate indusrty Experiance"
              onChange={this.chngehandl}
              id="job"
            />
          </div>
          <div className="form-group">
            <label> </label>
            <input
              type="text"
              name="currentPosition"
              className="form-control"
              placeholder="enter candidate currentPosition"
              onChange={this.chngehandl}
              id="job"
            />
          </div>

         
          <div className="form-group">
            <label> </label>
            <input
              type="text"
              name="JobPeriod"
              className="form-control"
              placeholder="enter candidate Job Period"
              onChange={this.chngehandl}
              id="job"
            />
          </div>



          <div class="form-group">
            <label for="exampleFormControlSelect2">
              change candidate status
            </label>
            <select class="form-control" id="status" onChange={this.chngehandlsel}>
              <option id='status'>1</option>
              <option id='status'>2</option>
              <option id='status'>3</option>
              <option id='status'>4</option>
              <option id='status'>5</option>
            </select>
          </div>
          <input type="submit" className="btn btn-primary" value="add" />
        </form>
      </div>
    );
  }
}

export default evaluation;
