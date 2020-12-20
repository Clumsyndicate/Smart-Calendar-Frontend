import React, {Component} from 'react'
import ImageUploader from 'react-images-upload';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


class ImgUpload extends React.Component {
 
  constructor(props) {
      super(props);
       this.state = { pictures: [] , uploaded: false};
       this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
      this.setState({
          pictures: this.state.pictures.concat(picture),
          uploaded:true
      });
     
       alert("Upload Success!")
  }

  render() {
      return (
          <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png', '.jpeg']}
              maxFileSize={5242880}
          />
          
          
      );
  }
}

function Contact(){
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));
    const classes = useStyles();
    const [contact, setContact] = React.useState('')
      const contactways = ['Email', 'TEL','Facebook','Snap','Instagram','WeChat']
    const handleChange = (event) => {
        setContact(event.target.value);
      };
    
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
      <form className={classes.root} noValidate autoComplete="off">
        
        
        <TextField
          id="standard-select-currency"
          select
          label="Contact Way"
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
        <TextField id="standard-basic" label="name/address/id" />
      </form>
      </div>
    );
}


class AboutMe extends Component{

render(){
    return(
    
    <div>
<h4 style={{textAlign:"center"}}>My Avatar</h4>
<ImgUpload/>
<h4 style={{textAlign:"center"}}>My Contact</h4>
<div>
<Contact/>
</div>


    </div>)
}

}

export default AboutMe