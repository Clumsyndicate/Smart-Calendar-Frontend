import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { findProps } from 'devextreme-react/core/template';



const useStyles = makeStyles({
  root: {
    maxWidth: 210,
    height:325,
    backgroundColor:"rgba(245,247,250)"
    //backgroundColor:'linear-gradient(red, white)'
    //background: 'linear-gradient(125deg, rgba(237,231,246,1) 38%, rgba(209,196,233,1) 100%)'
  },
  cardtext:{
    overflow:"scroll"

  },
  content:{
    height:115,
    overflow:"scroll",
    maxWidth:240,
    
  },
  
});

function Content(props){
  const classes = useStyles();
  if(!props.in){
    return(
      <div>
  <Typography variant="body2" color="textSecondary" component="p" >
  {props.text}
  </Typography>
  <Typography variant="body2" color="textSecondary" component="p">
  {props.classList}
  </Typography>
  </div>
  )
  }

  let contactText=""
  if(Object.keys(props.contact).length===0){
    contactText="No contact way shared~"
  }
  else{
    let way=props.contact.contact;
    contactText+=way;
    contactText+=": "+props.contact.contactval

  }

  return( 
  <div>
    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardtext}>
      {contactText}
    </Typography>

  </div>)
}


export default function FriendCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  let text
  if(props.num===1){
    text="1 class in common:"
  }
  else{
      text=props.num+" classes in common:"
  }
  let classList=""
  for(let i=0;i<props.num;i++){
    classList+=props.class[i];
    if(i!==props.num-1){
        classList+=", "
    }
  }
  const myimg = props.img
  // const myimg = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
  //const myimg = "data:image/png;base64, "+props.img
  console.log(myimg)
  let buttonText=expanded?"Hide Contact":"See Contact"
  return (
    <Card className={classes.root}>
    
        {/* <CardMedia
          component="img"
          height="170"
          image={myimg}
        /> */}
         <CardMedia
          component="img"
          height="170"
          image={myimg}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5">
            {props.name}
          </Typography>
          <Content in={expanded} text={text} classList={classList} contact={props.contact}/>
          </CardContent>
          
          
    
      <CardActions>
        
        <Button size="small" color="primary" onClick={handleExpandClick}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}