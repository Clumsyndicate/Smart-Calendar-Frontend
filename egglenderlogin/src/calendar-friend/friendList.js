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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background: 'linear-gradient(to bottom, #f57c00 30%, #ffb74d 90%)',
    textAlign: 'left',
    padding: '5px',
    color: '#5d4037',
    // marginLeft: '10px',
    fontFamily: 'Georgia',
  },
  layout: {
    border: '3px solid #ffb74d',
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function FriendList(props) {
  const classes = useStyles();
  console.log(props.data)
  let displaylength=props.data.length>8? 8:props.data.length

  return (
    <div>      
      <div className={classes.titleBar}><h5>Potential Study Partners:</h5></div>
      
      <div  className={classes.root}>
        <GridList className={classes.gridList} cols={11} cellHeight='auto'>
          {props.data.map((tile,index) => (
            <GridListTile key={index} rows={12}>
              {/* <img src={tile.img} alt={tile.title} /> */}
              <FriendCard name={tile.name} num={tile.total} img={tile.img} class={tile.classes} contact={tile.contact}/>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}