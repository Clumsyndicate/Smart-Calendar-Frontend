import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    height:300
  },
});

export default function FriendCard(props) {
  const classes = useStyles();
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
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          //alt="Contemplative Reptile"
          height="100"
          width="50"
          image={props.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {classList}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Button size="small" color="primary">
          See Contact
        </Button>
      </CardActions>
    </Card>
  );
}