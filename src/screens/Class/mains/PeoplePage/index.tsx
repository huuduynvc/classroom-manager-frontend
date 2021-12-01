import React, { useEffect, useState, useContext } from 'react'
import ListPeople from './../../components/ListPeople/index';
import { User } from 'models/User';
import DialogsInvite from 'screens/Class/components/DialogsInvite';

import { getClassMember } from "features/people/peopleThunk";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';
import MyProgress from 'components/MyProgress';
import { PeopleState } from 'features/people/peopleSlide';
import { StoreState } from 'models';
import { AuthContext } from 'context/AuthContext';

const PeoplePage = ({ id }: { id: string }) => {
    const dispatch = useDispatch()
    const [teachers, setTeachers] = useState<User[]>([]);
    const [students, setStudents] = useState<User[]>([]);
    const peopleState: PeopleState = useSelector((state: StoreState) => state.people) 
    const [activeInvite,setActiveInvite] = useState(false);
    const {user}  = useContext(AuthContext)
    useEffect(() => {
        (async () => {
            const resultActions: any = await dispatch(getClassMember(id));
            const value = unwrapResult(resultActions);
            if (value.data) {
                const users: User[] = value.data
                const newTeachers: User[] = []
                const newStudents: User[] = []
                users.map(userEle => {
                    if (userEle.email === user?.email && userEle.role_member===1){
                        setActiveInvite(true)
                    }
                    return userEle.role_member === 1 ?
                    newTeachers.push(userEle) : newStudents.push(userEle)
                }
                )
                setTeachers(newTeachers)
                setStudents(newStudents)
            }
        })()
    }, [dispatch, id,user?.email])

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const listUser:User[] = peopleState.list;
    const onClickInvite = (name: string) => {
        setName(name);
        setLink(name)
        handleClickOpen()
    }
    return (
        <MyProgress error={peopleState.error} loading={peopleState.loading}>
            <>
            <DialogsInvite link={link} name={name} open={open} handleClose={handleClose} />
            <ListPeople activeInvite={!activeInvite} onClickInvite={onClickInvite} listUser={teachers} />
            <ListPeople onClickInvite={onClickInvite} name="Students" listUser={students} />
            </>
        </MyProgress>
    )
}

export default PeoplePage
