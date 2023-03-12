import ky from 'ky';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

export class API {
  baseURL: string;

  constructor() {
    this.baseURL = process.env.BASE_URL;
  }

  getManufacturers() {
    return useSWR(this.baseURL + 'manufacturers', fetcher);
  }

  getColognes() {
    return useSWR(this.baseURL + 'colognes', fetcher);
  }

  getCologne(cologne: string) {
    return useSWR(this.baseURL + 'colognes/' + cologne, fetcher);
  }

  insertCologne(name: string, manufacturer: string, purchased: boolean, purchasedQuantity?: number) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('manufacturer', manufacturer);
    formData.append('purchased', purchased ? 'true' : 'false');
    if (purchasedQuantity === null || purchasedQuantity === undefined) purchasedQuantity = -1;
    formData.append('purchased_quantity', purchasedQuantity.toString());
    ky.post(this.baseURL + 'colognes', { body: formData });
  }

  async insertCologneAttributes(cologne: string, attributes: string[]) {
    return ky.post(this.baseURL + 'colognes/' + cologne + '/attributes', { json: attributes });
  }

}
