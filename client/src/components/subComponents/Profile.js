import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Context from '../../utils/authUtils/Context';
//import history from '../../utils/authUtils/history';
import {Link} from 'react-router-dom'
import AvatarDisplay from './AvatarDisplay';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
}));

export default function Profile() {
    const context = useContext(Context);    
    const classes = useStyles();

    const user = context.profileState;
    if (!context.authState) { 
        return <div className="alert alert-danger">Please <Link to="/signin">Sign in</Link> to check your profile </div>
    }
    else { 
        return (<>
        <List className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <ListItem>
                        <ListItemText primary={user.firstName} secondary="First Name" />
                    </ListItem>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <ListItem>
                        <ListItemText primary={user.lastName} secondary="Last Name" />
                    </ListItem>
                    </Grid>
            </Grid>
        <Divider component="li" />
        <li>
            <Typography
            className={classes.dividerFullWidth}
            color="textSecondary"
            display="block"
            variant="caption"
            >
            Detail
            </Typography>
        </li>
        <ListItem>
            <ListItemText primary={user.email} secondary="Email" />
        </ListItem>
        <Divider component="li" variant="inset" />
        <li>
            <Typography
            className={classes.dividerInset}
            color="textSecondary"
            display="block"
            variant="caption"
            >
            Role
            </Typography>
        </li>
        <ListItem>
            <AvatarDisplay context={context} classes={classes} />
        </ListItem>
        </List>
    </>
    )};
  }
