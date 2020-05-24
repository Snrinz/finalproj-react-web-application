import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withFormik} from 'formik'
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  // main: {
  //     display: 'grid',
  //     gridTemplateColumns: '1fr 1fr 1fr',
  // },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUpForm(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
    
  const classes = useStyles();
  // const debug = true;
  return (
    <Container className={classes.main} maxwidth="md">
      <CssBaseline />
      <div maxwidth="xs" className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        { errors.globalError && 
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errors.globalError}
          </Alert>
        }
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.firstName ? errors.firstName : ""}
                error={touched.firstName && Boolean(errors.firstName)}    
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
                autoComplete="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
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
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
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
                name="phoneNo"
                autoComplete="phoneNo"
                value={values.phoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
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
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}    
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmedPassword"
                label="Confirmed Password"
                type="password"
                id="confirmedPassword"
                autoComplete="current-password"
                value={values.confirmedPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.confirmedPassword ? errors.confirmedPassword : ""}
                error={touched.confirmedPassword && Boolean(errors.confirmedPassword)}    
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
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Container style={{display: debug? "block": "none"}} className={classes.paper} maxWidth="xs">
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <hr/>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </Container> */}
    </Container>
  );
}
var phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const SignUp = withRouter(withFormik({
  mapPropsToValues: ({
    firstName,
    lastName,
    email,
    password,
    confirmedPassword,
  }) => {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      confirmedPassword: confirmedPassword || "",
    };
  },
  
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .matches(/\w/, "Must be alphanumric")
      .required("first name is required"),
    lastName: Yup.string()
      .matches(/\w/, "Must be alphanumric")
      .required("first name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password"),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref('password'), 'Confirmed password must match to password'])
      .required('Password confirm is required'),    
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
      alert("ลงทะเบียนเสร็จแล้ว!!!   ด้วย Email " + res.user.email);
      // redirect page back to previous location if any, otherwise go to /      
      let history = props.history; //useHistory();
      let location = props.location; //useLocation();    
      let { from } = location.state || { from: { pathname: "/signin" } };
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
  displayName: "SignupForm"
})(SignUpForm));

export default SignUp;
