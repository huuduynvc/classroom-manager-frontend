import React from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { axiosInstance, parseJwt } from '../../utils';
import { Button } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

export default function Login(props) {
  const history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async function (data) {
    try {
      const res = await axiosInstance.post('/auth', data);
      if (res.data.authenticated) {
        // console.log(res.data.accessToken);
        localStorage.todoApp_accessToken = res.data.accessToken;

        const obj = parseJwt(res.data.accessToken);
        localStorage.todoApp_userId = obj.userId;

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

  // console.log(watch('example'));

  return (
    <div className="container">
      <form >
        <h3>Sign In</h3>
        <div className="fg">
          {/* <input type="text" placeholder="username" autoFocus {...register('username', { required: true })} />
          {errors.username && <span>*</span>} */}
          {/* <TextField
            id="username"
            label="Username *"
            type="text"
            multiline
            margin="normal"
            {...register('username', { required: true })}
          />
          {errors.username && <span>*</span>} */}
          <Input
            id="username"
            type="text"
            placeholder="Username"
            {...register('username', { required: true })}
          />
          {errors.username && <span>*</span>}
        </div>
        <div className="fg">
          {/* <TextField
            id="password"
            label="Password *"
            type="password"
            multiline
            margin="normal"
            {...register('password', { required: true })}
          />
          {errors.username && <span>*</span>} */}
        <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <span>*</span>}

          {/* <input type="password" placeholder="password" {...register('password', { required: true })} />
          {errors.password && <span>*</span>} */}
        </div>

        <div className="fg mt-3">
          {/* <button type="submit">Login</button> */}
          <Button onClick={handleSubmit(onSubmit)}>Sign in</Button>
        </div>
      </form>
    </div>
  )
}
