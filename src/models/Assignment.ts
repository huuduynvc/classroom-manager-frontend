export interface Assignment{
    id: number;
    id_class?:number;
    name: string;
    point: number;
    deadline?: Date|string;
    edit?:boolean;
}

export const initAssignment:Assignment = {
    id:-1,
    name:"",
    point:-1,
    deadline: new Date(),
    edit:false,
} 