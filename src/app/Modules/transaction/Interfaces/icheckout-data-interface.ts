export interface ICheckoutDataInterface {
    stripeTokenId: string,
    userId: string,
    email: string,
    planType: string,
    subscriptionId: number,
    companySubscriptionId: number,
    totalAmmount: number,
    companyId: string

}

export interface ICardDetailInterface {
    name: string,
    cardNumber: string,
    expiryYear: string,
    expiryMonth: string,
    cvv: string
}
