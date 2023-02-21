import { Grid, Paper,ThemeProvider, withStyles } from '@material-ui/core';
import React from 'react';
import * as d3 from "d3";
import { connect } from 'react-redux';
import data from './data.json'
import * as actionTypes from "../../../store/actions/actionTypes";
import  {PageTheme } from "../../../theme";
import GraphConfigure from '../../../components/GraphConfigure';


const styles = (theme)=>({
      LineChart: {
        overflow: 'visible' 
      },
      container:{
        marginTop: theme.spacing(1)
      },
      card: {
        marginTop: theme.spacing(1),
      },
      inputGrid:{
        [theme.breakpoints.down("xs")]: {
          display: "flex",
          justifyContent: "center",
        },
      },
      formControl: {
        margin: theme.spacing(0.5, 2),
        minWidth: 170,
        width: "80%",
        [theme.breakpoints.down("xs")]: {
          margin: theme.spacing(1, 0),
        }
      }

    });


class Graphs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataset: this.props.data,
      w:600,
      h:250,
      metrciName:"",
      labelName1:"",
      labelName2:""
    };
    this.setMetric = this.setMetric.bind(this);
    this.setLabelName1 = this.setLabelName1.bind(this);
    this.setLabelName2 = this.setLabelName2.bind(this);
  }
  chart = React.createRef();
  componentDidMount(){
    this.props.Get_Graph_Data();
    this.props.Get_Metrics_Data();
    this.renderChart();
  }

  setMetric(name){
    this.setState({
      metricName:name
  });
  }

  setLabelName1(name){
    this.setState({
      labelName1:name
  });
  }
  setLabelName2(name){
    this.setState({
      labelName2:name
  });
  }

  renderChart(){
    
    let lineData = []
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = 0; 
    let maxY = 0;
          for(let i = 0; i < 300; i++) {
            let a = data.data.result[0].values[i][0], b= data.data.result[0].values[i][1];
            if(a> maxX){
              maxX = a;
            }
            if(b> maxY){
              maxY = b
            }
            if(a<minX){
              minX = a;
            }
            if(b<minY){
              minY = b
            }
             lineData.push({x: i*15, y: b})
          }
        console.log(lineData)
          
          let xScale = d3.scaleLinear().domain([0, 4500]).range([0, 950])
          let yScale = d3.scaleLinear().domain([minY, maxY]).range([500, 0]) 
          console.log(minY,maxY)
          
          let line = d3.line()
           .x(dt => xScale(dt.x))
           .y(dt => yScale(dt.y))
          
          
          let xAxis = d3.axisBottom(xScale)
          let yAxis = d3.axisLeft(yScale)
          
          
          d3.select('#LineChart').selectAll('path').datum(lineData) 
         .attr('d', d3.line().x(dt => xScale(dt.x)) 
         .y(yScale(0))).attr("stroke", "blue").attr('fill', 'none') 
     
         
          d3.select('#LineChart').selectAll('path').transition().duration(1000) 
          .attr('d', line) 
          
          d3.select('#LineChart').append("g")
         .attr("transform", "translate(100, " + 500 + ")").call(xAxis)
    
         d3.select('#LineChart').append("g")
         .attr("transform", "translate(100, 0)").call(yAxis)
          

  }
  render(){
    const { classes } = this.props;
    return(
      <ThemeProvider theme={PageTheme}>
        <Paper spacing={3} className={classes.container}>
          <Grid item xs={12}>
            <GraphConfigure
              setMetric = {this.setMetric}
              setLabelName1 = {this.setLabelName1} 
              setLabelName2 = {this.setLabelName2}
              data = {this.props.metricsData}
            />
          </Grid>
        </Paper>
          <div>
            <Paper spacing={3} className={classes.container}>
              <Grid item xs={12}>
                <svg clasName ="chart" ref={this.chart} id="LineChart" width = {1200} height = {600}><path/></svg>
              </Grid>
            </Paper>
          </div>

      </ThemeProvider>
      
    )
  }
 
}

const mapDispatchToProps = (dispatch) => {
  return{
    Get_Graph_Data: (payload) =>
      dispatch({type: actionTypes.SAGA_FETCH_GRAPH_DATA}),
    Get_Metrics_Data: (payload) =>
      dispatch({type:actionTypes.SAGA_FETCH_METRICS_DATA})
}};

const mapStateToProps = (state) => {
  return{
    metricsData: state.telemetryReducer.metrics
  
    
}};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Graphs));
