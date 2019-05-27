import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./candidatecard.css";
import moments from "moment";

class CandidateCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    chbox: true
   
  };

  cnadidateview = () => {
    console.log(this.props);
    this.props.history.push("/getcandidate/" + this.props._id);
  };

  sendid = () => {
    this.setState({ chbox: !this.state.chbox });

    console.log(this.state,this.props._id);

this.props.triggershrt(this.props._id, this.state.chbox);
  };

  render() {
    if (this.props.date) {
      //console.log(this.props.date.slice(4, 24));
     // const dote = new Date(this.props.time)
     // console.log(dote.toTimeString)
      //Tue Apr 23 2019 12:21:53 GMT+0530 (+0530)
      var s = this.props.date.slice(4, 24); //"2019-04-24 18:00:00";  // from action.timeStamp

      //var actionTime = moment(s , "YYYY-MM-DD HH:mm:ssZ");
      var actionTime = moments(s, "MMM-DD-YYYY HH:mm:ssZ");
       var timeAgo = actionTime.fromNow();

      // console.log(timeAgo);
      //this.setState({timeAgo:timeAgo})

      // console.log("dataaa" + this.props.date);
      // var dd = new Date(this.props.date);
      // var d = dd.toJSON().slice(0, 10);
      
    }

    //   .toJSON()
    //   .slice(0, 10)
    //   .replace(/-/g, "/");

    return (
      <div>
        <div id="cancard" class="card bg-light  mt-5">
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

       <div>
       <label class="containershbox">
            Add to Shortlist
            <input
              type="checkbox"
              onChange={this.sendid}
              disabled={!(this.props.shortlisterId === undefined)}
            />
            <span class="checkmark" />
          </label>
       </div>

       <div className='cancarddivtime' >
       <h5>{timeAgo}</h5>
     {/* <h6>{d}</h6> */}


       </div>

        

          <div className="cancardbadgeDiv">
            <span class="badge badge-pill badge-danger">
              {this.props.status}
            </span>
          </div>
          <div class="card-body">
            <h4 class="card-title">{this.props.name}</h4>
            
            <table class="table table-borderless">
              <tbody className="cancardTable">
                <tr>
                  <th scope="row">job specification</th>
                  <td>{this.props.jobspec}</td>
                </tr>
                <tr>
                  <th scope="row">email</th>
                  <td>{this.props.email}</td>
                </tr>{" "}
                {this.props.assignToshortlisterbyName ? (<tr>
                    <th scope="row">Assigned by</th>
                    <td>{this.props.assignToshortlisterbyName}</td>
                  </tr>
                ) : (
                  <tr>
                  <th scope="row">Not allocated </th>
                  <td></td>
                  </tr>
                )}
                {this.props.shortlisterName ? (<tr>
                   <th scope="row">Allocated to shortlist to</th>
                    <td>{this.props.shortlisterName}</td>
                  </tr>
                ) : (
                  <tr>
                   <th scope="row">Not allocated </th>
                  <td></td>
                  </tr>
                )}
                <tr>
                  <th scope="row" />
                  <td />
                </tr>
              </tbody>
            </table>

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

export default withRouter(CandidateCard);
