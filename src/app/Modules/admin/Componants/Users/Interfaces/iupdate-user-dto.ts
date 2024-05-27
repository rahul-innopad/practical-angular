export interface IUpdateUserDto {
    userId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    passwordHash: string,
    email: string,
    loggerUserId: string,
    companyId: string,
    roleId: string
}
