import React, { useState } from 'react'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const MovieForm = (props) => {      
    const classes = useStyles();
    const [movie, setMovie] = useState(props.movie)

    const styleImage = {
        display: 'flex',
        display: 'block',
        maxWidth: '10%',
        margin: 'auto auto'
    }
    
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <img style={styleImage} src={require(`../img/${movie.photo}`)} 
            alt={movie.photo}></img>

            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <TextField
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="ชื่อภาพยนตร์"
                        
                        defaultValue={movie.name}
                        autoFocus
                     />
            </Grid>
            <Grid item xs={6} sm={6}>
                <TextField
                    defaultValue={movie.type}
                    variant="outlined"
                    required
                    fullWidth
                    id="type"
                    label="ประเภท"
                    name="type"
                    autoComplete="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.type ? errors.type : ""}
                    error={touched.type && Boolean(errors.type)}    
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    defaultValue={movie.trailer}
                    variant="outlined"
                    required
                    fullWidth
                    id="trailer"
                    label="ลิงค์ตัวอย่างภาพยนตร์"
                    name="trailer"
                    autoComplete="trailer"
                    value={values.trailer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.trailer ? errors.trailer : ""}
                    error={touched.trailer && Boolean(errors.trailer)}    
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    defaultValue={movie.director}
                    variant="outlined"
                    required
                    fullWidth
                    name="director"
                    label="ผู้กำกับ"
                    type="director"
                    id="director"
                    autoComplete="new-director"
                    value={values.director}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.director ? errors.director : ""}
                    error={touched.director && Boolean(errors.director)}    
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    defaultValue={movie.company}
                    variant="outlined"
                    required
                    fullWidth
                    name="company"
                    label="บริษัทผู้สร้าง"
                    type="director"
                    id="company"
                    autoComplete="current-director"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.company ? errors.company : ""}
                    error={touched.company && Boolean(errors.company)}    
                />
            </Grid>
            <Grid item xs={6}>
                <TextField style={{width: '400px'}}
                    defaultValue={movie.description}
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="เรื่องย่อภาพยนตร์"
                    name="description"
                    autoComplete="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.description ? errors.description : ""}
                    error={touched.description && Boolean(errors.description)}    
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Edit
          </Button>
        </form>
    )
}

const MovieFormFormik = withRouter(withFormik({
    mapPropsToValues: () => ({ name, type, description, trailer, director, company, photo }) => {
      return {
        name: name || "",
        type: type || "",
        description: description || "",
        trailer: trailer || "",
        director: director || "",
        company: company || "",
        photo: photo || "",

      };
    },
    validationSchema: Yup.object().shape({
        comment: Yup.string()
        .required()
    }),
    handleSubmit: (values, { setSubmitting}) => {
  
      fetch('/api/...', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      })
      .then(response => {
        if (response.status !== 200) {
          console.log(response.statusText);
          throw `Status Code: ${response.status} ${response.statusText}`;
        }

        return response.json()
      })
      .catch(err => { 
        console.log(err);
      });
      setSubmitting(false);
    },
    displayName: "MovieForm"
  })(MovieForm));

  export default MovieFormFormik;