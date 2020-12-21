import React, { Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class teachingButton extends Component
{

}

class TeachingButton extends Component {
    constructor(props) 
    {
        super(props);
        this.state = { 
          open: false,
          token: props.token, 
        };
    
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
      handleClickOpen() {
        this.setState({ open: true });
      }
      handleClose() {
        this.setState({ open: false });
      }
render()
{
    return (
        <div>
          <Button  style={{ color: 'white' }} onClick={this.handleClickOpen}>
            📖 New user's guide
          </Button>
          <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              How to use this calendar
            </DialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom>
                Thank you for choosing our product!
              </Typography>
              <p></p>
              <Typography gutterBottom>
                1. Update classes enrolled in
                 <a href="/setting"> Settings page</a>
                 . Enroll CS 97 will match many class mates.
              </Typography>
              <p></p>
              <Typography gutterBottom>
                2. Upload Calendar file downloaded from Study List (we have provided sample in the uploading window).
              </Typography>
              <p></p>
              <Typography gutterBottom>
                3. Feel free to explore other features such as changing views, time zones, checking events list, and find classmates.
              </Typography>
              <p></p>
              <Typography gutterBottom>
                4. Remember to save your changes before logging off!
              </Typography>
              <p></p>
              <Typography gutterBottom>
                ⬇️ Right click to see the full image guide.
              </Typography>
              <Image
                onClick={() => console.log('onClick')}
                src='https://i.ibb.co/ChKMr4C/Screen.jpg'
                aspectRatio={(13/9)}
              />
              <p></p>
              <Typography gutterBottom>
                * Events may take up to 15 seconds to reterive from server.
                  If the calendar does not show the calendar grid or data over 15 seconds, please refresh the page and thanks for your patience!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleClose} color="primary">
                Got that!
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  
}
export default withStyles(styles)(TeachingButton);