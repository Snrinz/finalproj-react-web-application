import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import Context from '../../utils/authUtils/Context';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 'auto',
    width: "80vw"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const GridDisplay = withWidth()((props) => {
    const classes = useStyles();
    const baseURL = 'http://localhost:4001/'

    const context = useContext(Context);   
    const {favor, images, handleClick, inFavorOnly} = props;
    const column = isWidthUp("lg", props.width)? 5: isWidthUp("sm", props.width)? 3: 1;

    let list = [];
    if (context.authState) {
        list = images.map((tile) => {
            if(!inFavorOnly || favor.indexOf(tile._id)>=0) {
                return (
                <GridListTile spacing={1}>
                <img src={`${baseURL}${tile.pathName}`} alt={tile.oriName} />
                <GridListTileBar
                    title={tile.oriName}
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                    actionIcon={
                    <IconButton aria-label={`star ${tile.oriName}`} className={classes.icon}
                        value={tile._id}  onClick={()=>handleClick(tile._id)}>
                        {favor.indexOf(tile._id)<0?
                            <FavoriteBorderOutlinedIcon />:
                            <FavoriteIcon style={{color:'red'}}/>}
                    </IconButton>
                    }
                />
                </GridListTile>)
        }})
    }
    else {
        list = images.map((tile) => {
            return (
                <GridListTile  spacing={1}>
                <img src={`${baseURL}${tile.pathName}`} alt={tile.oriName} />
                <GridListTileBar
                    title={tile.oriName}
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                />
                </GridListTile>
            )
        }
    )}

    return (
        <div className={classes.root}>
            <GridList cellHeight={200} spacing={5} cols={column} className={classes.gridList}>
                <GridListTile cols={column}>
                    <ListSubheader component="div">Favorite Image List</ListSubheader>
                </GridListTile>
                {images? list: <Alert severity="info">This is no favorite images yet!</Alert>}
            </GridList>
        </div>
    )
})

export default GridDisplay