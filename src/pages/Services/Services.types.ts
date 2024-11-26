import { PaymentType } from "../RegisterPage/components/Register/RegisterForm.props";

export type Employee = {
    id: string;
    fullName: string;
    city: string;
    experience: number;
    positionId: string;
    price: number | null;
    avatar: string;
    rating: RatingObject;
    paymentType: PaymentType;
}

type RatingObject = {
    rating: number;
    numberOfReviews: number;
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
    rating: RatingObject;
}

export type EmployeeBooking = {
    paymentType: string;
    price: number | null;
}

export type TransactionDetails = {
    userId: string;
    employeeId: string;
    amount: number;
    paymentId: string;
    startDateTime: Date;
    endDateTime: Date;
}