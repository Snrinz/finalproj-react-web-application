import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Context from '../../utils/authUtils/Context';
import '../../App.css';


import { Formik } from "formik";
import * as Yup from 'yup';
import { red } from '@material-ui/core/colors';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  


}));

const SignIn = () => {
  const context = useContext(Context)

  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password"),
  });

  // use Formik as wrapper JSX and form as its child component
  return (
    <Formik 
      initialValues={{email: "", password: ""}}
      validationSchema={validationSchema}
      onSubmit={ (values, { setErrors, setSubmitting }) => {
          context.authObj.signin(values, setErrors)  }}
    >  
    {({
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset
    }) => (
      <div className= {"center"}>
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        { errors.globalError && 
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errors.globalError}
          </Alert>
        }
        <form className={classes.form}  onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            color="secondary"
            // backgroundColor = "white"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            color="secondary"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
          />
          <FormControlLabel
            control={<Checkbox 
              name="remember" value={values.remember} color="primary" 
              onChange={handleChange} onBlur={handleBlur} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <br/>
          <label> ──────────────  or  ──────────────  </label>
          <br/>
          <div className={classes.test}>
          <br/>
          <Button 
                href="/signup"
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Create a New Account
          </Button> 
           </div>   
        </form>
      </div>
    </Container>
          <br/>
          <br/>
    </div>
    )}
  </Formik>
  );
}

export default SignIn;
