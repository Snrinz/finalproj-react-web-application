import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom'

export const mainListItems = (
  <div>
    {/* Movies */}
    <Link style={{}} to="/dashboard/movies">
      <ListItem button>
        <ListItemIcon>
        <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Movies" />
      </ListItem>
    </Link>
  </div>
);