import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import "./Shortlistcard.css";

class ShortlistCard extends Component {

constructor(props){
  super(props)
  console.log(props)
}

state = {
  chbox:true
}

componentDidMount(){
    console.log('props - '+JSON.stringify(this.props))
}


  cnadidateview = () => {
    console.log(this.props);
    this.props.history.push("/getcandidate/" + this.props.candidateId);
  };

  sendid=()=>{
    this.setState({chbox:!this.state.chbox})

    console.log(this.state)
    
    this.props.triggershrt(this.props._id , this.state.chbox )
  }



  render() {
    if (this.props.date) {
      console.log("dataaa" + this.props.date);
      var dd = new Date(this.props.date);
      var d = dd.toJSON().slice(0, 10);
      console.log();
    }

    //   .toJSON()
    //   .slice(0, 10)
    //   .replace(/-/g, "/");

    return (
      <div>
        <div id='cancard' class="card center bg-light mb-3 w-75">

        {/* <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={this.sendid} />
    <label class="form-check-label" for="exampleCheck1">Add to Shortlisting</label>
  </div> */}

{/**
 * assignToshortlisterbyId: "5caa511c56a61d6a2492ec96"
assignToshortlisterbyName: "Bharana perera"
date: "2019-04-07T19:38:55.028Z"
email: "mark@facebook.com"
jobspec: "CCO"
name: "Mark Zuckerburg"
shortlister: "5caa51ad56a61d6a2492ec98"
shortlisterName: "Dewindi Anushika"
status: "onhold"
 */}




      
      { <label> Allocated on -   {this.props.allocatedDate} </label>}
      { <label> Assigned by -   {this.props.allocatedUserName} </label>}

        <h1 className="badge">
              <span class="badge badge-pill badge-danger">{this.props.status}</span>
            </h1>
          <div class="card-body">
            
            <h4 class="card-title">{this.props.candidateName}</h4>
            <div>
              <h3 className="divecancard" > {d} </h3>
              <br />
            </div>
            <p class="card-text">


              <ul className="list-group" >
                <li  className="list-group-item " >job spechification :{this.props.status}</li>
                <li  className="list-group-item" >email :{this.props.allocatedDate} </li>
              </ul>
            </p>
            <input
              type="button"
              value="view"
              className="btn btn-primary"
              onClick={this.cnadidateview}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShortlistCard);
