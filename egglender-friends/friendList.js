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
    height:300,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
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
export default function FriendList() {
  const classes = useStyles();
  let displaylength=tileData.length>8? 8:tileData.length

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={displaylength} spacing={1}>
        {tileData.map((tile,index) => (
          <GridListTile key={index} rows={12}>
            {/* <img src={tile.img} alt={tile.title} /> */}
            <FriendCard name={tile.name} num={tile.total} img={tile.img} class={tile.classes} contact={tile.contact}/>


          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}