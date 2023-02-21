import React from 'react';
import {Grid,FormControl,InputLabel,Select,MenuItem } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) =>({
    inputGrid:{
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            justifyContent: "center",
          },
    },
    formControl:{
        margin: theme.spacing(0.5, 2),
        minWidth: 170,
        width: "80%",
        [theme.breakpoints.down("xs")]: {
          margin: theme.spacing(1, 0),
        }
    }

});
class GraphConfigure extends React.Component{
    constructor(props){
        super(props);
         this.onSelectMetrics = this.onSelectMetrics.bind(this);
         this.onSelectLabel1 = this.onSelectLabel1.bind(this);
         this.onSelectLabel2 = this.onSelectLabel2.bind(this);
    }

    onSelectMetrics(event){
        this.props.setMetric(event.target.value)
        console.log("reducer metrics data ##########", this.props.data)
        

    }

    onSelectLabel1(event){
        this.props.setLabelName1(event.target.value)
    }

    onSelectLabel2(event){
        this.props.setLabelName2(event.target.value)
    }
    
    render(){
        const {classes} = this.props;
        return(
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.inputGrid}>
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="raid">Metric</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange = {this.onSelectMetrics}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="raid">Label1</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange = {this.onSelectLabel1}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="raid">Label2</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            onChange = {this.onSelectLabel2}
                        >
                        <MenuItem value={40}>Forty</MenuItem>
                        <MenuItem value={50}>Fifty</MenuItem>
                        <MenuItem value={60}>Sixty</MenuItem>
                    </Select>
                </FormControl>
                
            </Grid>
        )
    }
}

export default  withStyles(styles)(GraphConfigure);