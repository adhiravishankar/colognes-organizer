import { flow, makeObservable, observable } from 'mobx';

import { API } from '../api/API';
import { Cologne } from '../models/Cologne';


export class AppStore {

  api: API;

  colognes: Map<string, Cologne> = observable.map();

  constructor() {
    this.api = new API(process.env.BASE_URL);
    makeObservable(this, {
      colognes: observable,
      listColognes: flow,
    });
  }

  *listColognes() {
    const colognesResponse = yield this.api.getColognes();
    const colognes = colognesResponse as Cologne[];
    colognes.forEach((cologne: Cologne) => this.colognes.set(cologne.Id, cologne));
  }
  
}
