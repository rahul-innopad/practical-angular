export interface IUserListsDto {
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
    roles:IRoleListDto[],
    isEdit:boolean
}

export interface IRoleListDto {
    createdBy: string,
    isActive: boolean,
    roleId: string,
    roleName: string
}
