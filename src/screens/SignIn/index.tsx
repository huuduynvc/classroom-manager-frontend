import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Lock from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';


import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginAction } from 'features/user/userThunk';
import { UserState } from 'features/user/userSlide';
import { useSelector } from 'react-redux';
import { StoreState } from 'models';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { AuthContext } from 'context/AuthContext';
import { parseJwt } from './../../config/axios';
import { User } from 'models/User';

const theme = createTheme({
  palette: {
    primary: { main: '#F5B62A' },
    secondary: { main: '#383938' },
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    backgroundColor: 'white',
    borderradius: '4px',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
  },
  inputF: {

  },
  avatar: {
    margin: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signup: {
    margin: theme.spacing(-2, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const userState: UserState = useSelector((state: StoreState) => state.user);
  const history = useHistory();
  const { changeUser } = useContext(AuthContext)
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    console.log(response);
    if (response) {
      localStorage.classroomApp_user = response;
      history.push('/');
    }
    return response;
  }

  const onSubmit = async function (data: any) {
    (async () => {
      try {
        const actionResult: any = await dispatch(loginAction(data));
        const currentData = unwrapResult(actionResult)
        if (changeUser && currentData.status === 200 && currentData.data.accessToken !== "") {
          const user: User = parseJwt(currentData.data.accessToken)
          changeUser(user)
          dispatch(push('/'))
        } else {
          toast.error("Error login")
        }
      } catch (err) {
        toast.error("Error login")
      }

    })()
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {/* <Grid item xs={9}>
            <img src={Logo} maxWidth="300" alt="Logo" className={classes.avatar} />
        </Grid> */}
          </Grid>

          <Typography component="div">
            <Box fontSize={30} fontWeight={600} m={-2}>
              SIGN IN
            </Box>
          </Typography>
          <Typography component="div">
            <Box fontSize={16} m={1} padding>
              Sign into your account
            </Box>
          </Typography>
          <form className={classes.form} noValidate>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={9}>
                <TextField
                  className={classes.inputF}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  autoFocus
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon color="disabled" /></InputAdornment>,
                  }}
                  {...register('username', { required: true })}
                />
              </Grid>

              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock color="disabled" /></InputAdornment>,
                  }}
                  {...register('password', { required: true })}
                />
              </Grid>

              {/* <Grid item xs={9}>
              <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              />
            </Grid> */}

              <Grid item xs={9} >
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    disabled={userState.loading}
                  >
                    Sign In
                  </Button>  {userState.loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: 'blue',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Box>
              </Grid>

              <Grid item>
                <Link href="#" variant="body2" color="secondary" >
                  You do not have an account?
                </Link>
                <Link href="#" variant="body2" color="secondary" >
                  Sign up.
                </Link>
              </Grid>

              {/* <Grid item>
              <Link href="#" variant="body2" color="secondary" >
                Forgot your password?
              </Link>
            </Grid> */}

              {/* <Grid item xs={9}>  
              <Typography component="div">
                <Box fontSize={20} m={3} padding>
                  <Link href="#" color="secondary" >
                        YOU DO NOT HAVE AN ACCOUNT?
                  </Link>
                  <Link href="#" color="secondary" >
                        Sign up
                  </Link>
                </Box>
              </Typography>
            </Grid> */}

              {/* <Grid item xs={9}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.signup}
              m={-1}
              >
              SIGN UP
              </Button>
            </Grid> */}
              <Grid item xs={9}>
                <GoogleLogin
                  clientId="342822553087-tk3j3esq34irgp2qqvqt40c4pjjcmmd3.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </Grid>

            </Grid>


          </form>
        </div>
      </Container>
    </MuiThemeProvider>
  );
}