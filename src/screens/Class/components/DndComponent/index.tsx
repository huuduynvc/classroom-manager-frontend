import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Assignment } from 'models';
import ItemDnd from './../ItemDnd/index';


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#98BAE7" : "white",
    color: isDragging ? "white" : "black",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
});

const DndComponent = ({
    onDragEnd,
    items, handleChangeDue,
    handleChangeName, handleChangePoint,
    handleEdit, handleDelete }: {
        items: Assignment[], handleChangeDue: (index, newValue) => void,
        handleChangePoint: (index, newPoint) => void,
        handleChangeName: (index, newTitle) => void,
        handleEdit: (index, newEdit) => void,
        handleDelete: (index) => void,
        onDragEnd: any
    }) => {
        
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={(item.id).toString()} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <ItemDnd
                                            handleDelete={handleDelete}
                                            handleChangeName={handleChangeName}
                                            handleChangePoint={handleChangePoint}
                                            item={item} index={index}
                                            handleChangeDue={handleChangeDue}
                                            handleEdit={handleEdit} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DndComponent
