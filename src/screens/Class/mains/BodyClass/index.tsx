import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ClassId from './../../components/ClassId/index';
import Posts from './../../components/Posts/index';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: '5px 25px',
    color: theme.palette.text.secondary,
}));

const BodyClass = () => {
    return (
        <Grid sx={{marginTop: '0.5rem'}} container spacing={4}>
            <Grid item xs={2}>
                <Item><ClassId id="epzqnsw"/></Item>
            </Grid>
            <Grid item xs={10}>
                <Item><Posts/></Item>
            </Grid>
        </Grid>
    )
}

export default BodyClass
