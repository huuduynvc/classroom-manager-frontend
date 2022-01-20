import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { joinClass } from 'features/class/classThunk';
import { axiosInstance } from 'config/axios';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

const Join = () => {
    const params:any = useParams()
    const {code,role} = params
    const dispatch = useDispatch()
    const history = useHistory()
    // const uploadState = useSelector((state:StoreState) => state.upload)

    useEffect(() => {
        async function init() {
            try{
                await axiosInstance.post('/api/class/ping')
            } catch(e){}

            try {
                const result:any = await dispatch(joinClass({code,role}))
                const value = unwrapResult(result)
                history.push(`/class/${value.data.id_class}`)
            }catch(e){
                toast.error("Join class error")
            }
        }
        init()
    },[dispatch,code,role,history])

    return (
        <div style={{marginTop: "2rem",
            width: "100%",
            display: "flex",
            justifyContent: "center"}}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    )
}

export default Join
