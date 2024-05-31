export class ApiConstants {

    //User Logging serive Proxies API Uri endpoint

    static readonly LoggedOut_Endpoint: string = "Login/service/logged-out?";

    //User Master Service Proxy
    static readonly GetUsersByOwnerId_EndPoint: string = "Users/service/get-users-by-ownerId?";

    static readonly GetUserProfile_EndPoint: string = "Users/service/get-user-profile?";

    static readonly CreateSubscriberAccount_EndPoint: string = "Users/service/create-subscriber-account";

    static readonly CreateUserAccountSubscriber_EndPoint: string = "Users/service/create-user-account-by-subscriber";

    static readonly UpdateUserAccountBySubscriber_EndPoint: string = "Users/service/update-users-account";

    static readonly DeactiveUserAccountBySubscriber_EndPoint: string = "Users/service/deactive-users-account?";


    //Subscriptionplan Master Service Proxy API End Points
    static readonly GetSubscriptionList_EndPoint: string = "SubscriptionPlan/get-subscription-plan";

    static readonly GetSubscriptionPlanByPlanType_EndPoint: string = "SubscriptionPlan/get-subscription-plan-by-type";

    static readonly GetRemainUserForSubscriberToAdd_EndPoint: string = "CompanySubcription/service/create-new-subscription-plan?";

    static readonly GetCompanySubscriptionDetails_Endoint:string="SubscriptionPlan/Get-company-subscriptionDetails?"


    //Payment Master Service Proxy Uri API EndPoint
    static readonly PaymentCheckout_EndPoint: string = "Payment/payment-checkout";

}
