import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
import moments from "moment";
import "./interviewcard.css";

class Interviewcard extends Component {
  // cnadidateview = () => {
  //   console.log(this.props);
  //   this.props.history.push("/getcandidate/" + this.props._id);
  // };

  componentDidMount() {
    console.log("mount");
    console.log(this.props);
  }

  render() {
    return (
      <div className="interviewcardmaindiv">
        <Card style={{ marginBottom: 20 }}>
          <CardContent>
            <Typography style={{ fontSize: 14 }} gutterBottom>
              <h5> {this.props.candidateName} </h5>
              <h5> {this.props.interviwerName} </h5>
              <h5> {this.props.schedulerName} </h5>
              <h5> {this.props.datetime}</h5>
              <h1> {moments(this.props.datetime).fromNow()}</h1>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <div className="paddingdivinterviewcard" />
      </div>
    );
  }
}

export default Interviewcard;

// {
//   /* <h1> {this.props.schedulerName} </h1>
// <h1>{this.props.candidateName}</h1> */
// }
// {
//   /* {this.props.interviwerName}
// {this.props.schedulerName}
//  */
// }
