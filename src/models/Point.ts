export interface Point{
    username:string;
    id: string;
    points: PointAssignment[];
}

export interface PointAssignment{
    point: number;
    grade: string;
    gradeName: string;
}