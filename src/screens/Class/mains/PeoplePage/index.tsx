import React, { useEffect, useState, useContext } from 'react'
import ListPeople from './../../components/ListPeople/index';
import { User } from 'models/User';
import DialogsInvite from 'screens/Class/components/DialogsInvite';
import { importExcelStudents } from "features/upload/uploadThunk";

import { getClassMember } from "features/people/peopleThunk";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';
import MyProgress from 'components/MyProgress';
import { PeopleState } from 'features/people/peopleSlide';
import { StoreState } from 'models';
import { AuthContext } from 'context/AuthContext';
import DialogImport from 'screens/Class/components/DialogImport';

const PeoplePage = ({ id }: { id: string }) => {
    const dispatch = useDispatch()
    const [teachers, setTeachers] = useState<User[]>([]);
    const [students, setStudents] = useState<User[]>([]);
    const peopleState: PeopleState = useSelector((state: StoreState) => state.people) 
    const [activeInvite,setActiveInvite] = useState(false);
    const {user}  = useContext(AuthContext)
    const [flag,setFlag] = useState(false)
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
    }, [dispatch, id,user?.email,flag])

    const [open, setOpen] = React.useState(false);
    const [openImport, setOpenImport] = React.useState(false);
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseImport = () => {
        setOpenImport(false);
    };
    // const listUser:User[] = peopleState.list;
    const onClickInvite = (name: string) => {
        setName(name);
        setLink(name)
        handleClickOpen()
    }

    const onClickDownload = () => {
        console.log("donwload")
    }
    const onClickImportStudents = () => {
        setOpenImport(true)
    }
    return (
        <MyProgress error={peopleState.error} loading={peopleState.loading}>
            <>
            <DialogsInvite link={link} name={name} open={open} handleClose={handleClose} />
            <DialogImport callback = { () =>{
               setFlag(!flag)
            }}title="list students" importDispatch={importExcelStudents} classid={id} open={openImport} handleClose={handleCloseImport} />
            <ListPeople activeInvite={!activeInvite} onClickInvite={onClickInvite} listUser={teachers} />
            <ListPeople onClickImportStudents={onClickImportStudents} onClickDownload={onClickDownload} onClickInvite={onClickInvite} name="Students" listUser={students} />
            </>
        </MyProgress>
    )
}

export default PeoplePage
