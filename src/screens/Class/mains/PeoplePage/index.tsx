import React, { useEffect } from 'react'
import ListPeople from './../../components/ListPeople/index';
import {User} from 'models/User';
import DialogsInvite from 'screens/Class/components/DialogsInvite';

import { getTeachersOfClass, getStudentsOfClass } from "features/people/peopleThunk";
import { useDispatch, useSelector } from "react-redux";
import { PeopleState } from "features/people/peopleSlide";
import { StoreState } from "models";
import { useParams } from "react-router-dom";

const PeoplePage = () => {
    const dispatch = useDispatch()
    const peopleState: PeopleState= useSelector((state: StoreState) => state.people)
    //const param  = useParams();
    //console.log(param);
    useEffect(() => {
        (async () => {
        await dispatch(getTeachersOfClass('1'));
        })()
    }, [dispatch])

    const [open, setOpen] = React.useState(false);
    const [name,setName] = React.useState("");
    const [link,setLink] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const listUser:User[] = [{username:"Duy",id:"12323"},{username:"123123",id:"12323"}] 
    const listUser:User[] = peopleState.list;
    const onClickInvite = (name:string) =>{
        setName(name);
        setLink(name)
        handleClickOpen()
    }
    return (
        <div>
            <DialogsInvite link={link} name={name} open={open} handleClose={handleClose}/>
            <ListPeople onClickInvite={onClickInvite} listUser={listUser}/>
            <ListPeople onClickInvite={onClickInvite} name="Students" listUser={listUser}/>
        </div>
    )
}

export default PeoplePage
