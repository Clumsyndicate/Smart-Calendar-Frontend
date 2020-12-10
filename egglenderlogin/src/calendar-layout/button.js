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

import axios from 'axios';
const api = axios.create({
  baseURL: `https://5fc9fe933c1c22001644175c.mockapi.io/events`
})

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

function convert(str) {
  var ret = str;
  if (ret.indexOf("DTSTART") !== -1) {
    var temp = ret.match(/.+?(?=;DTSTART)/);
    ret = temp[0];
  }
  return ret;
}
function timezone(str) {
  var newstr = new String(str);
  var sub = newstr.substring(0, 25);
  var txt = new String(sub + "GMT-0700 (PST)");
  return txt;
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
        var start = timezone(ev.start);
        var end = timezone(ev.end);
        if (ev.rrule !== undefined) {
          var rrule = convert(ev.rrule.toString());
          var url = "null";
          if (ev.url !== undefined) {
            url = ev.url;
          }
        }
        temp.push({
          text: event,
          startDate: start,
          endDate: end,
          id: i,
          location: url,
          recurrenceRule: rrule
        });
      }
    }
  }
  // post the data onto the backend
  for (var j = 0; j < temp.length; ++j)
  {
    try {
      const response = api.post(`https://5fc9fe933c1c22001644175c.mockapi.io/events`, temp[j], config);
      console.log('👉 Returned data:', response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
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
          Upload Calendar File
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Upload your Class Planner calendar file
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              If you do not have a calendar file (.ics) yet, you could download
              the sample calendar file here:
              <a href="url"> sample .ics file</a>
            </Typography>

            <DropzoneArea
              onChange={(files) => {
                if (files[0] !== undefined) {
                  var promise = files[0].text();
                  console.log(promise);
                  const dataPromise = promise.then((result) => {
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

export default withStyles(styles)(uploadButton);
