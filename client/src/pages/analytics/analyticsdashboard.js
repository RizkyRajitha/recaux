
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
      date7=today.getDate()+'/'+ (today.getMonth() + 1);
      
    var someDate = new Date();
    someDate.setDate(someDate.getDate() -6); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date1 = dd + '/'+ mm ;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() -5); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date2 = dd + '/'+ mm;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() -4); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date3 = dd + '/'+ mm ;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() -3); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date4 = dd + '/'+ mm ;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() -2); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date5 = dd + '/'+ mm ;

    var someDate = new Date();
    someDate.setDate(someDate.getDate() -1); //Formatting to dd/mm/yyyy :
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var date6 = dd + '/'+ mm ;


  this.state={ 
     data1 : [
        { name: 'Shortlisted', value: 400 },
        { name: 'On hold', value: 300 },
        { name: 'Rejected', value: 300 },   
      ],
      
    data2 : [
    { name: 'QA Engineer', value: 6 },
    { name: 'Software Engineer', value: 3 },
    { name: 'Business Analysist', value: 3 },
    { name: 'Project Manager', value: 2 },
  ],


   data3 : [
    {
      name: date1,  NumberOfCVs: 10, 
    },
    {
      name: date2, NumberOfCVs: 10, 
    },
    {
      name: date3,  NumberOfCVs: 10, 
    },
    {
      name: date4,  NumberOfCVs: 10,
    },
    {
      name: date5,  NumberOfCVs: 10, //daybeforeyesterday
    },
    {
      name: date6,  NumberOfCVs: 10, //yesterday
    },
    {
      name: date7, NumberOfCVs: 10, //today
    },
  ]

};
}

componentDidMount() {
    axios.get('http://localhost:3001/usr/analytics')
        .then(response => {
            console.log("response -"+JSON.stringify(response.data))
            this.state.data3[0].NumberOfCVs=response.data.yesterdayCandidates
            this.state.data3[1].NumberOfCVs=response.data.yesterday1Candidates
            this.state.data3[2].NumberOfCVs=response.data.yesterday2Candidates
            this.state.data3[3].NumberOfCVs=response.data.yesterday3Candidates
            this.state.data3[4].NumberOfCVs=response.data.yesterday4Candidates
            this.state.data3[5].NumberOfCVs=response.data.yesterday5Candidates
            this.state.data3[6].NumberOfCVs=response.data.todayCandidates
            this.forceUpdate()
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

      {/* <Card style={card} className={card}>
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
    </Card> */}

    {/* <Card style={card} className={card}>
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
    </Card> */}

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
        <Tooltip/>
      </PieChart></div> 
    </CardContent>
</Card>

<Card style={pie} className={pie}>
    <CardContent>
    <Typography variant ="h5" component="h2" >
        Classification Based On Job Specification
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
        <Tooltip/>
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