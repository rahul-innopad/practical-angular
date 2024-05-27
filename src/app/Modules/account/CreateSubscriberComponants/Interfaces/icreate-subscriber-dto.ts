export interface ICreateSubscriberDto {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    phoneNumber: string,
    roleId: string,
    companyId: string,
    coumpanyName: string,
    subscriptionId: number,
    // userAddress: {
    //     address: string,
    //     country: string,
    //     state: string,
    //     city: string,
    //     zipCode: string
    // },
}
