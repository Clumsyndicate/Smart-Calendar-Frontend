import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    float:"left",
  },
  gridList: {
    flexWrap: 'nowrap',
    height:335,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  cardroot: {
    width: 320,
    height:325
  },
  cardtext:{
    overflow:"hidden"

  },
  content:{
    height:115,
    overflow:"hidden",
  },
  
});

export default function LoadingFriends() {
  const classes = useStyles();
  const array = ["","","","","","",,"",""]
  return (


    <div>
      <br/>
    <div style={{textAlign:"left"}}><h5>Potential Study Partners:</h5></div>
    <br/>
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={14} spacing={1}>
        {array.map((tile,index) => (
          <GridListTile key={index} rows={13}>
               <Card className={classes.cardroot}>
    
    
    <Skeleton variant="rect" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>

    
    <CardContent className={classes.content}>
             <Skeleton width="100%"/>
         <Skeleton animation={false} />
         <Skeleton animation="wave" />
      </CardContent>
    
</Card>
            {/* <Skeleton />
         <Skeleton animation={false} />
        <Skeleton animation="wave" /> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
    // <div className={classes.root}>
    //     <br/>
    // <div style={{textAlign:"left"}}><h5>Potential Study Partners:</h5></div>
    //     <br/>
    //   <Skeleton />
    //   <Skeleton animation={false} />
    //   <Skeleton animation="wave" />
    // </div>
  );
}