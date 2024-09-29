export type Employee = {
    id: string,
    fullName: string,
    city: string,
    experience: number,
    positionId: string,
    price: number | null;
    avatar: string;
}

export interface ICityOption {
    value: string;
    label: string;
}