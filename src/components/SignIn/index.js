// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';
// import { axiosInstance, parseJwt } from '../../utils';
// import { Button } from "@material-ui/core";
// import Input from '@material-ui/core/Input';
// import TextField from '@material-ui/core/TextField';

// export default function Login(props) {
//   const history = useHistory();
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();

//   const onSubmit = async function (data) {
//     try {
//       const res = await axiosInstance.post('/auth', data);
//       if (res.data.authenticated) {
//         // console.log(res.data.accessToken);
//         localStorage.todoApp_accessToken = res.data.accessToken;

//         const obj = parseJwt(res.data.accessToken);
//         localStorage.todoApp_userId = obj.userId;

//         history.push('/');
//       } else {
//         alert('Invalid login.');
//       }
//     } catch (err) {
//       if (err.response) {
//         console.log(err.response.data);
//         // console.log(err.response.status);
//         // console.log(err.response.headers);
//       } else if (err.request) {
//         console.log(err.request);
//       } else {
//         console.log('Error', err.message);
//       }

//       // console.log(err.config);
//     }
//   }

//   // console.log(watch('example'));

//   return (
//     <div className="container">
//       <form >
//         <h3>Sign In</h3>
//         <div className="fg">
//           {/* <input type="text" placeholder="username" autoFocus {...register('username', { required: true })} />
//           {errors.username && <span>*</span>} */}
//           {/* <TextField
//             id="username"
//             label="Username *"
//             type="text"
//             multiline
//             margin="normal"
//             {...register('username', { required: true })}
//           />
//           {errors.username && <span>*</span>} */}
//           <Input
//             id="username"
//             type="text"
//             placeholder="Username"
//             {...register('username', { required: true })}
//           />
//           {errors.username && <span>*</span>}
//         </div>
//         <div className="fg">
//           {/* <TextField
//             id="password"
//             label="Password *"
//             type="password"
//             multiline
//             margin="normal"
//             {...register('password', { required: true })}
//           />
//           {errors.username && <span>*</span>} */}
//         <Input
//             id="password"
//             type="password"
//             placeholder="Password"
//             {...register('password', { required: true })}
//           />
//           {errors.password && <span>*</span>}

//           {/* <input type="password" placeholder="password" {...register('password', { required: true })} />
//           {errors.password && <span>*</span>} */}
//         </div>

//         <div className="fg mt-3">
//           {/* <button type="submit">Login</button> */}
//           <Button onClick={handleSubmit(onSubmit)}>Sign in</Button>
//         </div>
//       </form>
//     </div>
//   )
// }


import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Lock from '@material-ui/icons/Lock';
import Mail from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';

import Logo from '../../assets/logo.png'

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { axiosInstance, parseJwt } from '../../utils';

const theme = createMuiTheme({
  palette:{
    primary:{main: '#F5B62A'},
    secondary:{main:'#383938'},
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
  inputF:{

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

  const history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async function (data) {
    try {
      const res = await axiosInstance.post('/auth', data);
      if (res.data.authenticated) {
        // console.log(res.data.accessToken);
        localStorage.classroomApp_accessToken = res.data.accessToken;

        const obj = parseJwt(res.data.accessToken);
        localStorage.classroomApp_userId = obj.userId;

        history.push('/');
      } else {
        alert('Invalid login.');
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }

      // console.log(err.config);
    }
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
          <Box fontSize={16} m={1} paddingT>
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
                name="username"
                autoComplete="username"
                autoFocus
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon color="disabled"/></InputAdornment>,
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
              name="password"
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

            <Grid item xs={9}>
              <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              />
            </Grid>
              
            <Grid item xs={9} >
              <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              m={0}
              >
                Sign In
              </Button>
            </Grid>

            {/* <Grid item>
              <Link href="#" variant="body2" color="secondary" >
                Forgot your password?
              </Link>
            </Grid>

            <Grid item xs={9}>  
              <Typography component="div">
                <Box fontSize={20} m={3} paddingT>
                  <Link href="#" color="secondary" >
                        YOU DO NOT HAVE AN ACCOUNT?
                  </Link>
                </Box>
              </Typography>
            </Grid>

            <Grid item xs={9}>
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

          </Grid>

          
        </form>
      </div>
    </Container>
    </MuiThemeProvider>
  );
}