
import React, {Component,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import tileData from '../../calendar-friend/tileData'
import FriendList from '../../calendar-friend/friendList'
// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// });

export default class CenteredGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { friends: tileData };
  }
  
  render()
  {
    // const { classes } = this.props;
    return (
      <FriendList data={this.state.friends}/>
    );

  }
  
 
}
// export default withStyles(styles)(CenteredGrid);
// import React, {Component,useState} from 'react'
// import { Container } from '@material-ui/core';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';






// export default class eggProfile extends Component{
//     constructor(props) {
//         super(props);
//         this.state = { open: false};
//       }
//       render(){
//         return (
//           <React.Fragment>
//             <CssBaseline />
//             <Container maxWidth= {false}>
//               <Typography component="div" style={{ backgroundColor: '#673ab7', height: '50vh' }} />
//             </Container>
//             <Container maxWidth= {false}>
//               <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }} />
//             </Container>
//           </React.Fragment>
//           );

//     }   

// }




// export default function eggProfile() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };


//   return (
    
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open dialog
//       </Button>
//       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//         <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//           Upload your Class Planner calendar file
//         </DialogTitle>
//         <DialogContent dividers>
          
//           <Typography gutterBottom>
//             If you do not have a calendar file (.ics) yet, you could download the sample calendar file here: 
             
//           </Typography>
//           <a href="url">sample .ics file</a>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose} color="primary">
//             Save changes
//           </Button>

//           <label htmlFor="upload-photo">
//         <input
//           style={{ display: "none" }}
//           id="upload-photo"
//           name="upload-photo"
//           type="file"
//           accept=".ics,.txt"
//         />
//         <Button color="primary" component="span">
//           Upload
//         </Button>{" "}
       
        

//       </label>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
