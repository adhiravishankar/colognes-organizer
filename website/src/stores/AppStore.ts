import {action, flow, makeObservable, observable} from 'mobx';

import { API } from '../api/API';
import { Cologne } from '../models/Cologne';


export class AppStore {

  api: API;

  colognes: Map<string, Cologne> = observable.map();

  selectedCologne: Cologne;

  addModalShown: boolean;

  constructor() {
    this.api = new API(process.env.BASE_URL);
    makeObservable(this, {
      colognes: observable,
      addModalShown: observable,
      listColognes: flow,
      setAddModalShown: action,
    });
  }

  *listColognes() {
    const colognesResponse = yield this.api.getColognes();
    const colognes = colognesResponse as Cologne[];
    colognes.forEach((cologne: Cologne) => this.colognes.set(cologne.Id, cologne));
  }

  *getCologne(cologne: string) {
    const colognesResponse = yield this.api.getCologne(cologne);
    this.selectedCologne = colognesResponse as Cologne;
  }

  setAddModalShown(shown: boolean) {
    this.addModalShown = shown;
  }
  
}
