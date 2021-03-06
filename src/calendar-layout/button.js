import axios from 'axios';
import moment from "moment-timezone";
import React, { Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { DropzoneArea } from "material-ui-dropzone";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function refreshPage() {
  window.location.reload(false);
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton 
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function convert(str, flag) {
  var ret = str;
  if (ret.indexOf("DTSTART") !== -1) {
    var temp = ret.match(/.+?(?=;DTSTART)/);
    ret = temp[0];
  }
  if(flag === false){
    var process = ret.split("=")[3].split(",");
    var newweek = parseDay(process);
    var temp = ret.split("=")
    temp[3] = newweek
    return temp.join('=');
  }
  return ret;
}

function timezone(str) {
  var name = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var newstr = String(str);
  var sub = newstr.substring(0, 19);
  var procedure1 = sub.replace("-", "/");
  var procedure2 = sub.replace("T", " ");
  var GMT = moment.tz(procedure2, "Etc/GMT-0");
  var user = GMT.clone().tz(name);
  var actuallyLA = user.format();
  sub = actuallyLA.substring(0, 19);
  var procedure2 = sub.replace("T", " ");
  var Realuser = moment.tz(procedure2, "America/Los_Angeles");
  user = Realuser.clone().tz(name);
  if(name.includes("America")){
    return user.format().replace("T", " ").replace("-", "/").replace("-", "/").substring(0, 19);}
  return user.add(1, 'hours').format().replace("T", " ").replace("-", "/").replace("-", "/").substring(0, 19);
}

function modifyweek(str){
  var name = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var flag = false;
  var newstr = String(str);
  var sub = newstr.substring(0, 19);
  var procedure1 = sub.replace("-", "/");
  var procedure2 = sub.replace("T", " ");
  var GMT = moment.tz(procedure2, "Etc/GMT-0");
  var user = GMT.clone().tz(name);
  var actuallyLA = user.format();
  var flag1 = actuallyLA.split("-")[2].substring(0,2);
  sub = actuallyLA.substring(0, 19);
  var procedure2 = sub.replace("T", " ");
  var Realuser = moment.tz(procedure2, "America/Los_Angeles");
  user = Realuser.clone().tz(name);
  if(name.includes("America")){
    var flag2 = user.format().split("-")[2].substring(0,2);}
  else{
    var flag2 = user.add(1, 'hours').format().split("-")[2].substring(0,2);}
  return flag1 === flag2;
}

function analyze(strdata, config) {
  const raw = strdata;
  const ical = require("ical");
  const data1 = ical.parseICS(raw);
  var temp = [];
  var i = 0;
  for (let k in data1) {
    if (data1.hasOwnProperty(k)) {
      var ev = data1[k];
      if (data1[k].type === "VEVENT") {
        i++;
        var event = ev.summary;
        var url = "null";
        if (ev.url !== undefined) {
          url = ev.url;
        }
        if (ev.rrule !== undefined) {
          var weekflag = modifyweek(ev.start.toISOString());
          temp.push({
            text: event,
            startDate: timezone(ev.start.toISOString()),
            endDate: timezone(ev.end.toISOString()),
            id: i,
            location: url,
            recurrenceRule: convert(ev.rrule.toString(), weekflag)
          });
        }
        else if(String(ev.start).length > 20){
          temp.push({
            text: event,
            startDate: timezone(ev.start.toISOString()),
            endDate: timezone(ev.end.toISOString()),
            id: i,
            allDay: false,
          });
        }
        else{
          continue;
        }
      }
    }
  }
    try {
      const response = axios.post('/api/setschedule', temp, config);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
}

class uploadButton extends Component {
  //const [open, setOpen] = React.useState(false);
  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      token: props.token, 
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    loading: true,
    error: "",
    datab: null
  };

  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    
    const config = {
        headers: { "x-access-token": this.props.token }
    };
    
    const { open } = this.state;

    return (
      <div>
        <Button
          variant="contained"
          onClick={this.handleClickOpen}
        >
          <CloudUploadIcon />
          &nbsp; Upload Calendar File
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Upload your myUCLA Class Planner calendar file
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              If you do not have a calendar file (.ics) yet, you could choose to download one of the following sample calendar file (recommended).
              <p></p>
              ** Please right click to open download link in a new tab! **
              <p></p>
              <a href="https://drive.google.com/file/d/1sXH01vKmIdaOc5tjdK5ilUvUvjvi9038/view?usp=sharing"> Fall sample .ics file </a> (many events, require scroll back)
              <p></p>
              <a href="https://drive.google.com/file/d/1TmsDTo-GdPL7-7rd2cWPWxbQ1Jna6Xq5/view?usp=sharing"> Winter Break mock sample .ics file </a> (current events, RECOMMENDED)
              <p></p>
              <a href="https://drive.google.com/file/d/1MOOEcHpV0thN2x0FXfFlxR7QrWaMdGoQ/view?usp=sharing"> Winter sample .ics file </a> (less events, require scroll forward)
              <p></p>
              *New file uploaded will erase all existing events
            </Typography>

            <DropzoneArea
              onChange={(files) => {
                if (files[0] !== undefined) {
                  var promise = files[0].text();
                  promise.then((result) => {
                    this.setState({
                      datab: result,
                      loading: false,
                      error: false
                    });
                    analyze(result, config);
                    //console.log(this.state);
                  });
                }
              }}
              filesLimit={1}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={refreshPage} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function parseDay(original) {
  var string = "";
  for (var i = 0; i < original.length; i++) {
    if(original[i] == "SU")
      string += "MO,";
    if(original[i] == "MO")
      string += "TU,";
    if(original[i] == "TU")
      string += "WE,";
    if(original[i] == "WE")
      string += "TH,";
    if(original[i] == "TH")
      string += "FR,";
    if(original[i] == "FR")
      string += "SA,";
    if(original[i] == "SA")
      string += "SU,";
  }
  return string.substr(0, string.length -1);
}

export default withStyles(styles)(uploadButton);
