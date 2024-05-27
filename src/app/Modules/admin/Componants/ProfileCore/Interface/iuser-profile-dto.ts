export interface IUserProfileDto {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    normalizedUserName: string,
    email: string,
    phoneNumber: string,
    isActive: boolean,
    isDeleted: boolean,
    companyName: string,
    roles:ProfileRolse[]
}

export interface ProfileRolse {
    createdBy: string,
    isActive: boolean,
    roleId: string,
    roleName: string
}