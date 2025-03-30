
export type EditProfileDto = {
    username?: string;

    userId?: string;

    firstName?: string;

    lastName?: string;

    phoneNumber?: string;

    address?: string;

    gender?: string;

    birthday?: Date;

    imgDisplay?: string;
}


export type ChangePasswordUserDto = {
    oldPassword: string;
    newPassword: string
}
export type ChangePasswordAdminDto = {
    userId: string;
    password: string
}