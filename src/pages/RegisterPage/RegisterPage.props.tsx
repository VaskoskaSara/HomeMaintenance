export enum UserType{
    Customer = 0,
    IndividualEmployee =1,
    BusinessEmployee =2
}

export type RegistrationState = {
    userType: UserType,
    fullName: string,
    address: string,
    email: string,
    password: string,
    confirmPassword:string,
    phoneNumber: string,
    birthDate: Date,
    positionId: string,
    experience: number,
    price: number,
    avatar: FileList | File,
    photos: File[] | FileList
}

export interface Position {
    id: string,
    positionName: string
}

export interface ApiResponse<T> {
    data: T;
}