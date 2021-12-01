import { User } from 'models/User'
import React from 'react'
import Divider from '@mui/material/Divider';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const ListPeople = ({ name = "Teachers", listUser,onClickInvite,activeInvite=false }: { name?: string, listUser: User[],onClickInvite:(name:string)=>void ,activeInvite?:boolean}) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "10px 10px 0 10px" }}>
                <h3 style={{ fontWeight: 500, fontSize: 25, color: '#1967d2' }}>
                    {name}
                </h3>
                <Tooltip title={`Invite ${name.toLowerCase()}`}>
                    <IconButton disabled={activeInvite} onClick={() => onClickInvite(name)} color="primary" aria-label={`Invite ${name.toLowerCase()}`}>
                        <GroupAddIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <Divider sx={{ borderColor: '#1967d2' }} />


            <Grid container sx={{padding: "10px 10px 0 10px"}} spacing={2}>
                {listUser.map(user => (
                    <Grid item xs={8} sx={{display:'flex',alignItems:'center'}}>
                       <Avatar sx={{marginRight:'20px'}} src={user.avatar}/>
                        <p>{user.username}</p>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default ListPeople
