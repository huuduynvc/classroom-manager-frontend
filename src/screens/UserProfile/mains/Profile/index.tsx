import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm, SubmitHandler  } from 'react-hook-form';

type Inputs = {
    name: string,
    studentid: string,
    password:string
  };
  
const Profile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
    };

    return (
        <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "50vw",
                background: 'rgba(255, 255, 255, 0.35)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                backdropFilter: 'blur(4px)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '2rem 4rem'
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
                Duy
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            autoComplete="email"
                            value="duyh@github.com"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error = {errors.name as any}
                            fullWidth
                            id="name"
                            label="Name"
                            autoComplete="name"
                            {...register('name',{ pattern: /^[^0-9]+$/i })}
                        />
                    </Grid><Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="studentid"
                            label="Student ID"
                            {...register('studentid')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            {...register('password')}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Update
                </Button>
            </Box>
        </Box >
    )
}

export default Profile
