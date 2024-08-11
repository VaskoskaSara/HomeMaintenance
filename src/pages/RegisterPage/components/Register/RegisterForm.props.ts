import { UserType } from "../../RegisterPage.props";

export enum PaymentType {
    Hourly = 1,
    Overall = 2, 
    Contract = 3
}

export interface RegisterFormObject {
    fullName: string;
    city: string;
    phoneNumber: number;
    birthDate: Date;
    email: string;
    password: string;
    userType: UserType;
    positionId: string | null;
    paymentType: PaymentType | null;
    price: number | null;
    experience: number | null;
    avatar: File;
    photos: File[];
    newPosition: string | null;
}