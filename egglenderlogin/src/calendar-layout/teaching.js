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
            HOW TO USE
          </Button>
          <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              How to use this calendar
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                First step
              </Typography>
              <Typography gutterBottom>
                Second step
              </Typography>
              <Typography gutterBottom>
                Third step
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