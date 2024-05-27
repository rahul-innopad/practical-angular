export interface ICheckoutDataInterface {
    userId: string,
    email: string,
    cardDetials: ICardDetailInterface,
    companyId: string,
    planType: string,
    subscriptionId: number,
    companySubscriptionId: number
}

export interface ICardDetailInterface {
    name: string,
    cardNumber: string,
    expiryYear: string,
    expiryMonth: string,
    cvv: string
}
