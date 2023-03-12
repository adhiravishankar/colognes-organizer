import { get, post } from '@tkrotoff/fetch';
import ky from 'ky';

export class API {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  getColognes() {
    return get(this.baseURL + 'colognes').json();
  }

  getCologne(cologne: string) {
    return get(this.baseURL + 'colognes/' + cologne).json();
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

  async insertCologneAttributes(cologne: string, attributes: string[]) {
    return ky.post(this.baseURL + 'colognes/' + cologne + '/attributes', { json: attributes });
  }

}
