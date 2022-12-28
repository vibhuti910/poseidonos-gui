import React, { Component,forwardRef } from "react";
import { Paper,Typography, InputLabe,FormControl, Select,Button, Box, Link, Grid} from '@material-ui/core';
import { createTheme, withStyles, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/EditTwoTone';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { textAlign } from "@mui/system";
import AlertDialog from "../../components/Dialog";
import { customTheme } from '../../theme';

const styles = (theme) => ({
    writeBufferSelect: {
        
        "&>div": {
            paddingTop:0,
            paddingBottom:4
          },
        "&>div>p": {
            fontSize:14,
            overflow: "hidden",
            textOverflow: "ellipsis"
          }
      },
      pageHeader: customTheme.page.title,
      buttonContainer: {
        justifyContent: "center",
        padding: theme.spacing(0, 2),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1)
      },
      formControl: {
        margin: 0,
        fontSize:12,
        width: 170,
        [theme.breakpoints.down("xs")]: {
          margin: theme.spacing(1, 0),
        }
      },
});


class Preset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmOpen:false,
            confirmArray:true,
            arrayName: "",
        };
        
        this.createArray = this.createArray.bind(this);
        this.onSelectWriteBuffer = this.onSelectWriteBuffer.bind(this);
        this.closePopup =  this.closePopup.bind(this);
        this.onCreateDialogButton = this.onCreateDialogButton.bind(this);
    }

    setRowData(row){
        console.log("setting row data",row);
        this.setState({
            confirmOpen: true
        });
        this.props.setRowData(row)
    }
    createArray(){
        this.props.createArrayFromPreset();
    }

    onSelectWriteBuffer(event){
        this.props.setBufferPreset(event.target.value)
    }
    onCreateDialogButton(event){
        this.props.setArrayNamePreset(event)
    }
    closePopup() {
        this.setState({
          confirmOpen: false
        });
      }

    render(){
        const { classes } = this.props;
        console.log("Classesss")
        console.log(classes)
        const localCellStyle = {
            fontSize:12,
            paddingTop: 2,
            paddingBottom: 2
          }
        const presetTableColumns = [
            { title: 'Name', field: 'presetname',cellStyle: localCellStyle},
            { title: 'Fault Tolerance Level', field: 'faulttolerancelevel',cellStyle: localCellStyle },
            { title: 'Storage Disks', field: 'storagedisks',cellStyle: localCellStyle},
            { title: 'Spare Disks', field: 'sparedisks',cellStyle: localCellStyle },
            { title: 'Write Buffer Path', field: 'writebufferpath',cellStyle: localCellStyle, render: row =>{
                return (
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="writebuffer"style={{fontSize:12}} > Write Buffer Path</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            autoWidth = "true"
                            className={classes.writeBufferSelect}
                            onChange = {this.onSelectWriteBuffer}
                        >
                        {this.props.metadisks
                        ? this.props.metadisks.map((disk) => (
                            <MenuItem key={disk.name} value={disk.name}>
                                <Typography color="secondary">{disk.displayMsg}</Typography>
                            </MenuItem>
                        ))
                        : null}

                        </Select>
                        <Link  align="right">Create Disk</Link>
                    </FormControl>
                );
            }},
            { title: 'Actions', field: 'actions',cellStyle: localCellStyle ,render: row => {
                return  (
                    <Box display = 'flex'>
                    <IconButton onClick={console.log("delete")}>
                    <DeleteIcon color="primary" onClick = {
                        () => this.props.deletePreset(row)
                    }/>
                    </IconButton>
                    <Grid
                        item
                        container
                        className={classes.buttonContainer}
                    >
                        <Button
                            onClick={()=>this.setRowData(row)}
                            variant="contained"
                            color="primary"
                            data-testid="createarray-btn"
                            size= "small"
                            >
                        Create
                        </Button>
                        <AlertDialog
                        type="arrayFromPreset"
                        title="Array name"
                        description="Enter the name"
                        array={this.state.confirmArray}
                        open={this.state.confirmOpen}
                        setarrayname ={ (v) => this.onCreateDialogButton(v) }
                        onConfirm={(v) => {

                            this.setState({
                                confirmOpen: false
                            });
                            this.createArray();
                        }}
                        
                        handleClose={this.closePopup}
                        />
                    </Grid>
                    </Box>
                    );
             }
            }
        ];
        const presetInformation = [];
        const presets = this.props.presets;
        
        return(
            <Paper>
                <ThemeProvider theme={this.theme}>
                    <MaterialTable
                        title={(
                        <Typography className={classes.pageHeader} variant="h6" >Presets</Typography>    
                        )}
                        columns={presetTableColumns}
                        data={presets}
                        options={{
                            pageSize: 5,
                            selection: true,
                            showTextRowsSelected: false,
                            headerStyle: {
                                backgroundColor: '#788595',
                                color: '#FFF',
                                paddingTop: 8,
                                paddingBottom: 8,
                              }

                        }}
                        icons={{
                            FirstPage: () => <FirstPage id="VolumeList-icon-firstpage" />,
                            LastPage: () => <LastPage id="VolumeList-icon-lastpage" />,
                            NextPage: () => <ChevronRight id="VolumeList-icon-nextpage" />,
                            PreviousPage: () => <ChevronLeft id="VolumeList-icon-previouspage" />,
                            Search: () => <Search id="VolumeList-icon-search" />,
                            ResetSearch: Clear,
                            Edit: EditIcon,
                        }}
                    />
                    
                </ThemeProvider>
            </Paper>
        )
    }
}

export default withStyles(styles)(Preset);