import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

import { useDispatch } from 'react-redux';
import { updateProfileAction } from 'features/user/userThunk';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

type Inputs = {
    id: string,
    fullname: string,
    studentid: string,
    //password: string
};

const Profile = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const { user, changeUser } = useContext(AuthContext)
    const onSubmit = async function (data: any) {
        (async () => {
            try {
                const actionResult: any = await dispatch(updateProfileAction(data));
                const currentData = unwrapResult(actionResult);
                if (currentData.status === 200 && changeUser) {
                    if (user){
                        user.studentID = data.studentid
                        changeUser(user)
                    }
                    
                    toast.success("Update profile successfully")
                } else {
                    toast.error("Error update profile")
                }
            } catch (err) {
              toast.error("Error update profile")
            }
    
        })()
    }

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
                User Profile
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
                            value={user?.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.fullname?true:false}
                            fullWidth
                            id="fullname"
                            label="Full Name"
                            autoComplete="fullname"
                            defaultValue={user?.fullname}
                            {...register('fullname', { pattern: /^[^0-9]+$/i })}
                        />
                    </Grid><Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="studentid"
                            label="Student ID"
                            defaultValue={user?.studentID}
                            {...register('studentid')}
                        />
                    </Grid>
                    <Grid item xs={12} hidden>
                        <TextField
                            fullWidth
                            label="ID"
                            id="id"
                            autoComplete="id"
                            value={user?.id}
                            {...register('id')}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            {...register('password')}
                        />
                    </Grid> */}
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
