import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import { Assignment } from 'models';

const ItemDnd = ({ index, item, handleChangeDue, handleChangeName, handleChangePoint, handleEdit,handleDelete }:
    {
        index: number, item: Assignment,
        handleChangeDue: (index, newValue) => void,
        handleChangePoint: (index, newPoint) => void,
        handleChangeName: (index, newTitle) => void,
        handleEdit: (index, newEdit) => void,
        handleDelete: (index) => void
    }
) => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                display: 'flex',
                justifyContent: "space-between"
            }}
            noValidate
            autoComplete="off"
        >
            <TextField disabled={!item.edit} label="Title" variant="standard" value={item.name}
                onChange={(newTitle) => handleChangeName(index, newTitle)} />
            <TextField type="number" disabled={!item.edit} label="Point" variant="standard" value={item.point}
                onChange={(newPoint) => handleChangePoint(index, newPoint)} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disablePast
                        disabled={!item.edit}
                        label="Due"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={item.deadline}
                        onChange={(newValue) => {
                            handleChangeDue(index, newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <div style={{ display: 'flex', justifyContent: "space-between", borderRadius: '10px', flexDirection: 'column', backgroundColor: '#B8E4F0', marginLeft: '10px' }}>
                    {
                        item?.edit ? <Tooltip title="Done">
                            <IconButton onClick={() => handleEdit(index, !item.edit)} color="primary" aria-label="add to shopping cart">
                                <DoneIcon />
                            </IconButton>
                        </Tooltip> : <Tooltip title="Edit">
                            <IconButton onClick={() => handleEdit(index, true)} color="primary" aria-label="add to shopping cart">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    }

                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(index)} color="primary" aria-label="add to shopping cart">
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </Box>
    )
}

export default ItemDnd
