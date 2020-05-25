import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withFormik} from 'formik'
import * as Yup from 'yup';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        // width: '25ch',
      },
    },
  }));

function MovieForm(props) {
    const classes = useStyles();

    const [newMovie, setNewMovie] = useState({
        name: '', type: '', description: '', trailer: '', 
        director: '', actor: '', company: '', photo: '', onAirTime: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/newmovie', {
        method: 'POST',
        body: JSON.stringify(newMovie),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        .then(response => {            
            if (response.status !== 200) {
                console.log(response.statusText);
                throw `Status Code: ${response.status} ${response.statusText}`;
            }
            return response.json()
        })
        .then(res => {
            console.log("movie created success!!!");
            props.handleRefresh()            
        })
        .catch(err => { 
            console.log(err);
            
        });

        
          
    }
  return (    
    <form className={classes.form}>
    {/* <img style={styleImage} src={require(`../img/${movie.photo}`)} 
    alt={movie.photo}></img> */}

                <input type="file" name="photo" 
                onChange= {e => setNewMovie({...newMovie, photo: e.target.files[0]})} />

        <Grid container  alignItems="center" spacing={3}>
            <Grid item xs={12} sm={5}>
                <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Movie Name"
                    onChange={(e) => setNewMovie({...newMovie, name: e.target.value})}
                />
            </Grid>

            <Grid item xs={12} sm={5}>
                <TextField

                    autoComplete="type"
                    name="type"
                    variant="outlined"
                    required
                    fullWidth
                    id="type"
                    label="Type"
                    onChange={(e) => setNewMovie({...newMovie, type: e.target.value})}   
                />
            </Grid>          
        </Grid>

        <Grid container  alignItems="center" spacing={3} wrap="nowrap">
            <Grid item xs={12} sm={5}>
                <TextField

                    autoComplete="director"
                    name="director"
                    variant="outlined"
                    required
                    fullWidth
                    id="director"
                    label="Directory"
                    onChange={(e) => setNewMovie({...newMovie, director: e.target.value})}
                />
            </Grid>

            <Grid item xs={12} sm={5}>
                <TextField
                    autoComplete="company"
                    name="company"
                    variant="outlined"
                    required
                    fullWidth
                    id="company"
                    label="Company"
                    onChange={(e) => setNewMovie({...newMovie, company: e.target.value})}  
                />
            </Grid>          
        </Grid>

        <Grid container direction="column" justify="flex-start" spacing={3} wrap="nowrap">

            <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="actor"
                    name="actor"
                    variant="outlined"
                    required
                    fullWidth
                    id="actor"
                    label="Actor"
                    onChange={(e) => setNewMovie({...newMovie, actor: e.target.value})}
                    />
            </Grid>

            <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="onAirTime"
                    name="onAirTime"
                    variant="outlined"
                    required
                    fullWidth
                    id="onAirTime"
                    label="Date On Air"
                    onChange={(e) => setNewMovie({...newMovie, onAirTime: e.target.value})} 
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="trailer"
                    name="trailer"
                    variant="outlined"
                    required
                    fullWidth
                    id="trailer"
                    label="Trailer"
                    onChange={(e) => setNewMovie({...newMovie, trailer: e.target.value})}   
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="description"
                    name="description"
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    onChange={(e) => setNewMovie({...newMovie, description: e.target.value})} 
                />
            </Grid>     
            
            <Grid item xs={12} sm={12}>
                <Button type="submit" fullWidth onClick={e => handleSubmit(e)} variant="contained" color="primary" className={classes.submit}>
                    Record
                </Button>
            </Grid>     
        </Grid>

    </form>
  );
}

export default MovieForm