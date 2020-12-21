import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FriendCard from "./friendCard"
import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    float:"left",
  },
  gridList: {
    flexWrap: 'nowrap',
    height:335,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background: 'linear-gradient(to bottom, #f57c00 30%, #ffb74d 90%)',
    textAlign: 'left',
    padding: '5px',
    color: '#5d4037',
    fontFamily: 'Georgia',
  },
  layout: {
    border: '3px solid #ffb74d',
  }
}));


export default function FriendList(props) {
  const classes = useStyles();
  // console.log(props.data)
  let displaylength=props.data.length>8? 8:props.data.length

  if(props.data.length===0){
    return (
      <div>
        <div className={classes.titleBar}><h5>Potential Study Partners:</h5></div>
       <div>
    <p>No person seems to have classes in common as you so far. Try edit your enroll list in <a href="/setting">Settings page</a> to find studymates!</p>
    </div>
    <GridList className={classes.gridList} cols={displaylength} cellHeight='auto'></GridList>
    </div>)
  }
  
  return (
    <div>      
      <div className={classes.titleBar}><h5>Potential Study Partners:</h5></div>
      
      <div  className={classes.root}>
        <GridList className={classes.gridList} cols={displaylength} cellHeight='auto'>
          {props.data.map((tile,index) => (
            <GridListTile key={index} rows={12}>
              <FriendCard name={tile.name} num={tile.total} img={tile.img} class={tile.classes} contact={tile.contact}/>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}