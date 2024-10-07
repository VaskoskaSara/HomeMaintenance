import { PaymentType } from "../RegisterPage/components/Register/RegisterForm.props";

export type Employee = {
    id: string;
    fullName: string;
    city: string;
    experience: number;
    positionId: string;
    price: number | null;
    avatar: string;
}

export interface ICityOption {
    value: string;
    label: string;
}

export type EmployeeDetails = {
    fullName: string;
    phoneNumber: string;
    email: string;
    city: string;
    roleName: string;
    experience: number;
    price: number | null;
    paymentType: string;
    avatar: string;
    positionName: string;
    birthDate: Date;
    numberOfEmployees: number | null;
    description: string | null;
    photos: string[] | null;
}

export type EmployeeBooking = {
    paymentType: string;
    price: number | null;
}