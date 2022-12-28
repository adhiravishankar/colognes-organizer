import {get, post} from '@tkrotoff/fetch';

export class API {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  getColognes() {
    return get(this.baseURL + 'colognes').json();
  }

  insertCologne(name: string, manufacturer: string, purchased: boolean, purchasedQuantity?: number) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('manufacturer', manufacturer);
    formData.append('purchased', purchased ? 'true' : 'false');
    if (purchasedQuantity === null || purchasedQuantity === undefined) purchasedQuantity = -1;
    formData.append('purchased_quantity', purchasedQuantity.toString());
    post(this.baseURL + 'colognes', formData);
  }

}
