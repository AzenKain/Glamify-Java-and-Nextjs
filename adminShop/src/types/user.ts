
export type RoleTye = {
    id: string;
    name: string;
    description: string | null;
}

export type UserType = {
    details: any;
    
    id?: string;

    isDisplay?: boolean;

    username?: string;

    firstName?: string;

    lastName?: string;

    email?: string;

    phoneNumber?: string;

    imgDisplay?: string;

    birthday?: Date; 

    address?: string;

    gender?: string;

    role?: RoleTye[];

    updateAt?: Date;

    createdAt?: Date;
}