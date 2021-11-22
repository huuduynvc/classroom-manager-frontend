import React from 'react'


const ClassId = ({id}:{id:string}) => {
    return (
        <div>
            <h5>Class ID</h5>
            <h3 style={{color:'#1967d2',fontSize:20,wordWrap: 'break-word'}}>{id}</h3>
        </div>
    )
}

export default ClassId
