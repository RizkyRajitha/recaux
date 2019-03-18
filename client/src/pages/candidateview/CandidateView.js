import React, { Component } from "react";
import axios from "axios";
import './candidateview.css'

class CandidateView extends Component {
  state = {
    data: [],
    current_status: ""
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.wtf();
  }

  evalHndler = () => {
    const id = this.props.match.params.id;
    this.props.history.push("/evaluation/"+id);
  };

  wtf = () => {
    const id = this.props.match.params.id;
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
  };

  render() {
    if (this.state.data.date) {
      console.log("dataaa" + this.state.data.date);
      var dd = new Date(this.state.data.date);
      var d = dd.toJSON().slice(0, 10);
      console.log();
    }
    return (
      <div>
       
        
        <div className="canview">
          <div className="canview2" >
          <ul className='list'>
            <li> date reciver : {d}</li>
            <li> name : {this.state.data.name}</li>
            <li> email : {this.state.data.email}</li>
            <li> job spec : {this.state.data.jobspec}</li>
          </ul>
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
          <button onClick={this.evalHndler} className='btn btn-primary'>evaluate</button>
        </div>
      </div>
    );
  }
}

export default CandidateView;
