import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const MyProgress = ({children,loading,error}:{children:JSX.Element,loading:boolean,error:string}) => {
    if (error!==""){
        return (<h3 style={{height:"70vh",display:"grid",placeItems:"center"}}>Error fetching</h3>)
    } 

    return loading?<div style={{height:"70vh",display:"grid",placeItems:"center"}}><CircularProgress /></div>:children;
}

export default MyProgress
