
import React, { Component } from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import {PieChart, Pie, } from 'recharts';
import './analyticsDashboard.css';
//import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import { textAlign } from '@material-ui/system';
import axios from 'axios';

// const Data2 = props => (
  
//    {props.data2.value}
      
// )

  const card = {
      
    minWidth: 275,
    display:'block',
    width:'400px',
    height:'250px',
    margin:'10px'
  }
  const bullet ={
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  }
  const title = {
    fontSize: 14,
  }
  const pos = {
    marginBottom: 12,
  }
  const bar = {
      height:'500px',
      width:'300px',
      minWidth: 275,
    display:'block',
    margin:'10px'
  }

  const drop={
      textAlign:'200px'
  }

  const pie = {
    minWidth: 275,
    display:'block',
    width:'500px',
    height:'500px',
    margin:'10px'
  }

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};




export default class analyticsdashboard extends Component {

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

constructor(props){
  super(props);
  
      var today= new Date(),
      date1=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      
      var today= new Date("December 30, 2017 11:20:25"),
      date2=today.setDate(today.getDate()-2);
    //   var dt = new Date("December 30, 2017 11:20:25");
    //   dt.setDate( dt.getDate() - 10 );


  this.state={ 
     data1 : [
        { name: 'Shortlisted', value: 400 },
        { name: 'On hold', value: 300 },
        { name: 'Rejected', value: 300 },   
      ],
      
    data2 : [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ],


   data3 : [
    {
      name: date1,  NumberOfCVs: 2400, amt: 2400,
    },
    {
      name: date2, NumberOfCVs: 1398, amt: 2210,
    },
    {
      name: 'Page C',  NumberOfCVs: 9800, amt: 2290,
    },
    {
      name: 'Page D',  NumberOfCVs: 3908, amt: 2000,
    },
    {
      name: 'Page E',  NumberOfCVs: 4800, amt: 2181,
    },
    {
      name: 'Page F',  NumberOfCVs: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, NumberOfCVs: 4300, amt: 2100,
    },
  ]

};
}

componentDidMount() {
    axios.get('http://localhost:3001/usr/analytics')
        .then(response => {


            console.log("response -"+JSON.stringify(response.data))
            this.state.data3.NumberOfCVs=response.data.yesterdayCandidates
        

            //this.setState({ data3: response.data3 });
        })
        .catch(function (error){
            console.log(error);
        })
}
// piechart2() {
//   return this.state.data2.map(function(currentData2, i){
//       return <Data2 data2={currentData2} key={i} />;
//   })
// }

  render() {
    return (  
      <div className="main">
      <div className="container1">

      <Card style={card} className={card}>
      <CardContent>
        <Typography variant ="h5" component="h2" >
          Total Candidates
        </Typography><br/>
        
        <Typography   component="h3" className={pos}  >
        <div className="growth">
        <i className="material-icons">arrow_upward</i>
        <p className="para">16% Since last month</p>
        </div>
        </Typography><hr/>

        <Typography   component="h3" className={pos} color="textSecondary" >
        <div className="growth">
        <i className="material-icons">arrow_upward</i>
        <p className="para">9% Email</p>
        </div>
        </Typography>

        <Typography   component="h3" className={pos} color="textSecondary" >
        <div className="growth">
        <i className="material-icons">arrow_upward</i>
        <p className="para">7% Topjobs</p>
        </div>
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

    <Card style={card} className={card}>
      <CardContent>
        <Typography variant ="h5" component="h2" >
          Total Candidates
        </Typography><br/>
        
        <Typography   component="h3" className={pos}  >
        <div className="growth">
        <i className="material-icons">arrow_upward</i>
        <p className="para">16% Since last month</p>
        </div>
        </Typography><hr/>

        <Typography   component="h3" className={pos} color="textSecondary" >
        <div className="growth">
        <i className="material-icons">arrow_upward</i>
        <p className="para">9% Email</p>
        </div>
        </Typography>

        <Typography   component="h3" className={pos} color="textSecondary" >
        <div className="growth">
        <i className="material-icons">arrow_upward</i>
        <p className="para">7% Topjobs</p>
        </div>
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    
     
    </div>

    
    
         <br/><br/><br/>
         <div className="container2">

       <Card className="bar">
           
           <CardContent>
           <Typography variant ="h5" component="h2" >
            CV's Received
        </Typography>
        
        <CardActions style={drop}>
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Last 7 days
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      {/* {for(int i=10;i>0;i--){
         <a className="dropdown-item" href="#">Action</a> 
      }} */}
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</div>
           </CardActions>
           <div className="bar">
       <BarChart
        width={700}
        height={500}
        data={this.state.data3}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="NumberOfCVs" fill="#8884d8" />
        
      </BarChart></div>
           </CardContent>
       
        </Card>
        

   
<Card style={pie} className={pie}>
    <CardContent>
    <Typography variant ="h5" component="h2" >
        Candidate Status
        </Typography>
        <div className="pie">
          {this.piechart2}
        <PieChart width={400} height={400}>
        <Pie
          data={this.state.data1}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={180}
          fill="#8884d8"
          dataKey="value"
        >
          {
            this.state.data1.map((entry, index) => <Cell key={'cell-${index}'} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart></div> 
    </CardContent>
</Card>

<Card style={pie} className={pie}>
    <CardContent>
    <Typography variant ="h5" component="h2" >
        Candidate Status
        </Typography>
        <div className="pie">
        <PieChart width={400} height={500}>
        <Pie
          data={this.state.data2}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={180}
          fill="#8884d8"
          dataKey="value"
        >
          {
            this.state.data2.map((entry, index) => <Cell key={'cell-${index}'} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart></div>
    </CardContent>
</Card>

     



</div>
</div>
    );
  }
}



















// import React from 'react';
// import './RecruitmentsRepo.css';
// import ChartistGraph from 'react-chartist';


// class RecruitmentsRepo extends React.Component {
//   render() {
    
//     var data = {
//       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         series: [
//         [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]
//       ]
//     };
    
//     var options = {
//       seriesBarDistance: 15
//     };

//     var responsiveOptions = [
//       ['screen and (min-width: 641px) and (max-width: 1024px)', {
//         seriesBarDistance: 10,
//         axisX: {
//           labelInterpolationFnc: function (value) {
//             return value;
//           }
//         }
//       }],
//       ['screen and (max-width: 640px)', {
//         seriesBarDistance: 5,
//         axisX: {
//           labelInterpolationFnc: function (value) {
//             return value[0];
//           }
//         }
//       }]
//     ];
 
//     var type = 'Bar'

    
    
    
 
//     return (
      
//       <div>
//         <h1>Recruitments</h1>
//         <ChartistGraph data={data} options={options} type={type} responsiveOptions={responsiveOptions} />
        

//       </div>
//     );
//   }
// }
// export default  RecruitmentsRepo


     {/* <div className="bar">
      <BarChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="NumberOfCVs" fill="#8884d8" />
        
      </BarChart></div> */}