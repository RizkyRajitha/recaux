import React, { Component } from "react";
import { Cell, Tooltip, Legend } from "recharts";
import { PieChart, Pie } from "recharts";
import "../analyticsDashboard.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

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

class Hrstatuspie extends Component {
  state = {
    data1: [
      { name: "Shortlisted", value: 400 },
      { name: "On hold", value: 300 },
      { name: "Rejected", value: 300 }
    ],
    data: []
  };

  componentDidMount() {
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .get("/usr/reportshrstatus", config)
      .then(result => {
        console.log(result.data);

        
        var arr = [];
        arr.push({ name: "On hold", value: result.data.onhold });
        arr.push({ name: "Rejected", value: result.data.rejected });
        arr.push({ name: "Shortlisted", value: result.data.shortlisted });
        arr.push({ name: "Pending", value: result.data.unset });
        this.setState({ data: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Card style={pie} className={pie}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Interview
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
    );
  }
}

export default Hrstatuspie;
