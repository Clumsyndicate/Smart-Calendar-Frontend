import React, {Component} from 'react'
import ImageUploader from 'react-images-upload';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { stubTrue } from 'lodash';
function Contact(props){
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));
    const classes = useStyles();
    const [changed,setChange]=React.useState(false)
    const [contact, setContact] = React.useState('')
      const contactways = ['Email', 'TEL','Facebook','Snap','Instagram','WeChat']
    const handleChange = (event) => {
        setContact(event.target.value);
        props.handleContactChange(event.target.value)
        setChange(true)
      };
    const handleValueChange = (event) => {
        props.handleContactValueChange(event.target.value)
    };
    
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"1em"}}>
      <form className={classes.root} noValidate autoComplete="off">
        
        
        <TextField
          id="standard-select-currency"
          select
          label={(props.contact==="")?"Contact Way":props.contact}
          defaultValue={props.contact}
          value={contact}
          onChange={handleChange}
          helperText="Please select your contact way"
        >
          {contactways.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField id="standard-basic" label={props.contactval} onChange={handleValueChange} defaultValue={(props.contactval==="")?"name/address/id":props.contactval}/>
      </form>
      </div>
    );
}

export default Contact