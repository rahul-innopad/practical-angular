import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferServiceService {

  getSubscriptionValue = 0;
  private readonly SubscriptionId = 'SubscriptionId';
  private readonly SubscriptionType = 'SubscriptionValue';
  private readonly SubscriptionAmmount = 'SubscriptionAmmount';
  private readonly TotalAmmount = 'TotalAmmount';
  private readonly UserId = 'UserId';
  private readonly UserEmailId = 'EmailId';
  private readonly CompanySubscriptionId = 'CompanySubscriptionId';
  private readonly CompanyId = 'CompanyId';
  constructor() { }

  setSubscriptionId(id: number) {
    sessionStorage.setItem(this.SubscriptionId, `${id}`);
  }

  getSubscriptionId(): number {
    if (this.SubscriptionId) {
      const id = sessionStorage.getItem(this.SubscriptionId);
      let idNumber = Number(id);
      return idNumber;
    }
    return 0;
  }

  setSubscriptionDetails(userId: string, subscriptionType: string, subscriptionAmmount: number, TotalAmmount: number, emailId: string,
    companySubscriptionId: number, subscriptionId: number, companyId: string
  ) {
    sessionStorage.setItem(this.UserId, `${userId}`);
    sessionStorage.setItem(this.UserEmailId, `${emailId}`);
    sessionStorage.setItem(this.SubscriptionType, `${subscriptionType}`);
    sessionStorage.setItem(this.SubscriptionAmmount, `${subscriptionAmmount}`);
    sessionStorage.setItem(this.TotalAmmount, `${TotalAmmount}`);
    sessionStorage.setItem(this.CompanySubscriptionId, `${companySubscriptionId}`);
    sessionStorage.setItem(this.SubscriptionId, `${subscriptionId}`);
    sessionStorage.setItem(this.CompanyId, `${companyId}`);

  }

  getSubscriptionDetials() {
    const userId = sessionStorage.getItem(this.UserId);
    const email = sessionStorage.getItem(this.UserEmailId);
    const subscriptionType = sessionStorage.getItem(this.SubscriptionType);
    const total = sessionStorage.getItem(this.TotalAmmount);
    const subTotal = sessionStorage.getItem(this.SubscriptionAmmount);
    const companySubscriptionId = sessionStorage.getItem(this.CompanySubscriptionId);
    const subscriptionId = sessionStorage.getItem(this.SubscriptionId);
    const companyId = sessionStorage.getItem(this.CompanyId);
    if (companyId && subscriptionId && companySubscriptionId && email && userId && subscriptionType && total && subTotal) {
      return { companyId,subscriptionId, companySubscriptionId, email, userId, subscriptionType, total, subTotal };
    }
    return null;
  }

  removeSubscriptionDetails() {
    sessionStorage.removeItem(this.UserId);
    sessionStorage.removeItem(this.SubscriptionType);
    sessionStorage.removeItem(this.SubscriptionAmmount);
    sessionStorage.removeItem(this.TotalAmmount);
    sessionStorage.getItem(this.SubscriptionAmmount);
    sessionStorage.getItem(this.CompanySubscriptionId);
    sessionStorage.getItem(this.SubscriptionId);
    sessionStorage.getItem(this.CompanyId);
  }
}
