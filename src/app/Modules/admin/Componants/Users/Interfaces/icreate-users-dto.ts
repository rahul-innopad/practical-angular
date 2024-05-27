export interface ICreateUsersDto {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    passwordHash: string,
    email: string,
    loggerUserId: string,
    companyId: string,
    roleId: string,
    userAddressDto: UserAddressDto
}

export interface UserAddressDto {
    address: string,
    country: string,
    state: string,
    city: string,
    zipCode: string
}
