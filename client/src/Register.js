import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withFormik} from 'formik'
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  const classes = useStyles();
  return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    helperText={touched.firstName ? errors.firstName : ""}
                    error={touched.firstName && Boolean(errors.firstName)} 
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="lname"
                    value={values.lastName}
                    helperText={touched.lastName ? errors.lastName : ""}
                    error={touched.lastName && Boolean(errors.lastName)} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNo"
                    label="phoneNo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="phoneNo"
                    autoComplete="phoneNo"
                    value={values.phoneNo}
                    helperText={touched.phoneNo ? errors.phoneNo : ""}
                    error={touched.phoneNo && Boolean(errors.phoneNo)} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                    value={values.password}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)} 
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
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/sign-in" variant="body2">
                    { "Already have an account? Sign in" }
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
  );
};

const phoneNoRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Register = withRouter(withFormik({
  mapPropsToValues: () => ({ firstName, lastName, email, password , phoneNo }) => {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      phoneNo: phoneNo || ""
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .matches(/\w/, "Must be alphanumric")
      .required("first name is required"),
    lastName: Yup.string()
      .matches(/\w/, "Must be alphanumric")
      .required("last name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password"),
    phoneNo: Yup.string()
      .matches(phoneNoRegExp, "phoneNo number is not valid")
      .min(10, "phoneNo must be 10 numerics")
      .required("Enter your password"),
  }),

  handleSubmit: (values, { setSubmitting, setErrors, props }) => {
    fetch('/user/register', {
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
    .then(res => {
      alert("Congratulation! " + res.message + " with " + res.user.email);
      // redirect page back to previous location if any, otherwise go to /      
      let history = props.history; //useHistory();
      let location = props.location; //useLocation();    
      let { from } = location.state || { from: { pathname: "/sign-in" } };
      history.replace(from);
    })
    .catch(err => { 
      console.log(err);
      
      if (typeof err === 'object' && err.errors) {
          if(Object.keys(err.errors).includes("globalError"))
            if (Object.keys(err.errors.globalError).length > 1) 
              setErrors({...err.errors.globalError, globalError: "Global errors: errors sending from server"});
            else setErrors({globalError: err.errors.globalError})
      }
      else {
        console.log(err);
        setErrors({globalError: err})
      }
    });
    setSubmitting(false);
  },
  
  displayName: "Form"
})(Form));

export default Register;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
