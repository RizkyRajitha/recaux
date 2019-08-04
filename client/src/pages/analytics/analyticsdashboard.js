import React, { Component } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { PieChart, Pie } from "recharts";
import "./analyticsDashboard.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import { textAlign } from '@material-ui/system';
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigationIcon from "@material-ui/icons/Navigation";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const card = {
  minWidth: 275,
  display: "block",
  width: "400px",
  height: "250px",
  margin: "10px"
};
const bullet = {
  display: "inline-block",
  margin: "0 2px",
  transform: "scale(0.8)"
};
const title = {
  fontSize: 14
};
const pos = {
  marginBottom: 12
};
const bar = {
  height: "500px",
  width: "300px",
  minWidth: 275,
  display: "block",
  margin: "10px"
};

const drop = {
  textAlign: "200px"
};

const pie = {
  minWidth: 275,
  display: "block",
  width: "500px",
  height: "500px",
  margin: "10px"
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
    // <text>{this.state.data1.name}</text>
  );
};

export default class analyticsdashboard extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/30763kr7/";
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";

  searchRepo = e => {
    this.props.history.push("/searchAnalytics");
  };

  constructor(props) {
    super(props);

    var today = new Date(),
      date7 = today.getDate() + "/" + (today.getMonth() + 1);

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 6); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date1 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 5); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date2 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 4); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date3 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 3); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date4 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 2); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date5 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 1); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date6 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 7); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date8 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 8); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date9 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 9); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date10 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 10); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date11 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 11); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date12 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 12); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date13 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 13); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date14 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 14); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date15 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 15); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date16 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 16); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date17 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 17); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date18 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 18); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date19 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 19); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date20 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 20); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date21 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 21); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date22 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 22); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date23 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 23); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date24 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 24); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date25 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 25); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date26 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 26); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date27 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 27); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date28 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 28); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date29 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 29); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date30 = dd + "/" + mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 30); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date31 = dd + "/" + mm;

    this.state = {
      data1: [
        { name: "Shortlisted", value: 400 },
        { name: "On hold", value: 300 },
        { name: "Rejected", value: 300 }
      ],

      data2: [
        { name: "QA Engineer", value: 3 },
        { name: "Software Engineer", value: 3 },
        { name: "Business Analysist", value: 3 },
        { name: "Project Manager", value: 3 }
      ],
      data4: [{ name: "Manual", value: 4 }, { name: "Email", value: 3 }],

      data5: [
        { name: "No Shows", value: 400 },
        { name: "Cancellations", value: 300 },
        { name: "Interviewed", value: 300 }
      ],

      data3: [
        {
          name: date31,
          NumberOfCVs: 10
        },
        {
          name: date30,
          NumberOfCVs: 10
        },
        {
          name: date29,
          NumberOfCVs: 10
        },
        {
          name: date28,
          NumberOfCVs: 10
        },
        {
          name: date27,
          NumberOfCVs: 10
        },
        {
          name: date26,
          NumberOfCVs: 10
        },
        {
          name: date25,
          NumberOfCVs: 10
        },
        {
          name: date24,
          NumberOfCVs: 10
        },
        {
          name: date23,
          NumberOfCVs: 10
        },
        {
          name: date22,
          NumberOfCVs: 10
        },
        {
          name: date21,
          NumberOfCVs: 10
        },
        {
          name: date20,
          NumberOfCVs: 10
        },
        {
          name: date19,
          NumberOfCVs: 10
        },
        {
          name: date18,
          NumberOfCVs: 10
        },
        {
          name: date17,
          NumberOfCVs: 10
        },
        {
          name: date16,
          NumberOfCVs: 10
        },
        {
          name: date15,
          NumberOfCVs: 10
        },
        {
          name: date14,
          NumberOfCVs: 10
        },
        {
          name: date13,
          NumberOfCVs: 10
        },
        {
          name: date12,
          NumberOfCVs: 10
        },
        {
          name: date11,
          NumberOfCVs: 10
        },
        {
          name: date10,
          NumberOfCVs: 10
        },
        {
          name: date9,
          NumberOfCVs: 10
        },
        {
          name: date8,
          NumberOfCVs: 10
        },
        {
          name: date1,
          NumberOfCVs: 10
        },
        {
          name: date2,
          NumberOfCVs: 10
        },
        {
          name: date3,
          NumberOfCVs: 10
        },
        {
          name: date4,
          NumberOfCVs: 10
        },
        {
          name: date5,
          NumberOfCVs: 10 //daybeforeyesterday
        },
        {
          name: date6,
          NumberOfCVs: 10 //yesterday
        },
        {
          name: date7,
          NumberOfCVs: 10 //today
        }
      ]
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/usr/analytics")
      .then(response => {
        console.log("response -" + JSON.stringify(response.data));
        this.state.data1[0].value = response.data.shortlistedCandidates;
        this.state.data1[1].value = response.data.onholdCandidates;
        this.state.data1[2].value = response.data.rejectedCandidates;
        // this.state.data2[0].value = response.data.qaCandidates;
        // this.state.data2[1].value = response.data.seCandidates;
        // this.state.data2[2].value = response.data.baCandidates;
        // this.state.data2[3].value = response.data.pmCandidates;
        this.state.data3[0].NumberOfCVs = response.data.yesterday29Candidates;
        this.state.data3[1].NumberOfCVs = response.data.yesterday28Candidates;
        this.state.data3[2].NumberOfCVs = response.data.yesterday27Candidates;
        this.state.data3[3].NumberOfCVs = response.data.yesterday26Candidates;
        this.state.data3[4].NumberOfCVs = response.data.yesterday25Candidates;
        this.state.data3[5].NumberOfCVs = response.data.yesterday24Candidates;
        this.state.data3[6].NumberOfCVs = response.data.yesterday23Candidates;
        this.state.data3[7].NumberOfCVs = response.data.yesterday22Candidates;
        this.state.data3[8].NumberOfCVs = response.data.yesterday21Candidates;
        this.state.data3[9].NumberOfCVs = response.data.yesterday20Candidates;
        this.state.data3[10].NumberOfCVs = response.data.yesterday19Candidates;
        this.state.data3[11].NumberOfCVs = response.data.yesterday18Candidates;
        this.state.data3[12].NumberOfCVs = response.data.yesterday17Candidates;
        this.state.data3[13].NumberOfCVs = response.data.yesterday16Candidates;
        this.state.data3[14].NumberOfCVs = response.data.yesterday15Candidates;
        this.state.data3[15].NumberOfCVs = response.data.yesterday14Candidates;
        this.state.data3[16].NumberOfCVs = response.data.yesterday13Candidates;
        this.state.data3[17].NumberOfCVs = response.data.yesterday12Candidates;
        this.state.data3[18].NumberOfCVs = response.data.yesterday11Candidates;
        this.state.data3[19].NumberOfCVs = response.data.yesterday10Candidates;
        this.state.data3[20].NumberOfCVs = response.data.yesterday9Candidates;
        this.state.data3[21].NumberOfCVs = response.data.yesterday8Candidates;
        this.state.data3[22].NumberOfCVs = response.data.yesterday7Candidates;
        this.state.data3[23].NumberOfCVs = response.data.yesterday6Candidates;
        this.state.data3[24].NumberOfCVs = response.data.yesterday5Candidates;
        this.state.data3[25].NumberOfCVs = response.data.yesterday4Candidates;
        this.state.data3[26].NumberOfCVs = response.data.yesterday3Candidates;
        this.state.data3[27].NumberOfCVs = response.data.yesterday2Candidates;
        this.state.data3[28].NumberOfCVs = response.data.yesterday1Candidates;
        this.state.data3[29].NumberOfCVs = response.data.yesterdayCandidates;
        this.state.data3[30].NumberOfCVs = response.data.todayCandidates;
        this.state.data4[0].value = response.data.manualCandidates;
        this.state.data4[1].value = response.data.emailCandidates;
        this.forceUpdate();
      })
      .catch(function(error) {
        console.log(error);
      });

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .get("/usr/reportsjobspec", config)
      .then(data => {
        console.log("jobspepwkdlksjsnfapifn");
        console.log(data.data);
        this.state.data2 = data.data;
        this.forceUpdate();
      })
      .catch(err => console.log(err));
  }
  // piechart2() {
  //   return this.state.data2.map(function(currentData2, i){
  //       return <Data2 data2={currentData2} key={i} />;
  //   })
  // }

  render() {
    return (
      <div className="main">
        {/* <Button variant="contained" color="secondary" className="button">Learn more</Button> */}
        <div className="button">
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={this.searchRepo}
          >
            <NavigationIcon />
            LEARN MORE
          </Fab>
        </div>
        <br />
        <div className="container1">
          <Card className="bar">
            <CardContent>
              <Typography variant="h5" component="h2">
                CV's Received
              </Typography>
              <br />
              <div className="bar">
                <BarChart
                  width={1500}
                  height={300}
                  data={this.state.data3}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    label={{
                      value: "Date",
                      position: "insideBottomRight",
                      offset: -20
                    }}
                  />
                  <YAxis
                    label={{
                      value: "No Of CVs Received",
                      angle: -90,
                      position: "insideBottomLeft"
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="NumberOfCVs" fill="#8884d8" />
                </BarChart>
              </div>
            </CardContent>
          </Card>
        </div>

        <br />
        <div className="container2">
          <Card style={pie} className={pie}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Candidate Status
              </Typography>
              <div className="pie">
                <PieChart width={400} height={400}>
                  <Pie
                    data={this.state.data1}
                    cx={200}
                    cy={170}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={0}
                    outerRadius={120}
                    paddingAngle={5}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {this.state.data1.map((entry, index) => (
                      <Cell
                        key={"cell-${index}"}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </CardContent>
          </Card>

          <Card style={pie} className={pie}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Job Specification
              </Typography>
              <br />
              <div className="pie">
                <PieChart width={400} height={400}>
                  <Pie
                    data={this.state.data2}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={0}
                    outerRadius={120}
                    paddingAngle={5}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {this.state.data2.map((entry, index) => (
                      <Cell
                        key={"cell-${index}"}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </CardContent>
          </Card>

          <Card style={pie} className={pie}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Source
              </Typography>
              <div className="pie">
                <PieChart width={400} height={400}>
                  <Pie
                    data={this.state.data4}
                    cx={200}
                    cy={170}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={0}
                    outerRadius={120}
                    paddingAngle={5}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {this.state.data4.map((entry, index) => (
                      <Cell
                        key={"cell-${index}"}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </CardContent>
          </Card>

          <Card style={pie} className={pie}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Interview
              </Typography>
              <div className="pie">
                <PieChart width={400} height={400}>
                  <Pie
                    data={this.state.data5}
                    cx={200}
                    cy={170}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={0}
                    outerRadius={120}
                    paddingAngle={5}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {this.state.data5.map((entry, index) => (
                      <Cell
                        key={"cell-${index}"}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
