import { KyResponse } from 'ky';
import { action, flow, makeObservable, observable } from 'mobx';

import { API } from '../api/API';
import { Cologne } from '../models/Cologne';
import { DetailedCologne } from '../models/DetailedCologne';
import {Attributes} from "react";
import { Attribute } from '../models/Attribute';


export class AppStore {

  api: API;

  colognes: Map<string, Cologne> = observable.map();

  selectedCologne: DetailedCologne;

  get selectedCologneAttributes(): string[] {
    return this.selectedCologne.Attributes.map<string>((value: Attribute) => value.Attribute);
  }

  addModalShown: boolean;

  addAttributesModalShown: boolean;

  addedAttributes: string[] = observable.array();

  deleteAttributesModalShown: boolean;

  constructor() {
    this.api = new API(process.env.BASE_URL);
    makeObservable(this, {
      colognes: observable,
      addModalShown: observable,
      addAttributesModalShown: observable,
      deleteAttributesModalShown: observable,
      addedAttributes: observable,
      listColognes: flow,
      getCologne: flow,
      insertCologneAttributes: flow,
      setAddModalShown: action,
      setAddAttributesModalShown: action,
      setDeleteAttributesModalShown: action,
      deleteChip: action,
    });
  }

  *listColognes() {
    const colognesResponse = yield this.api.getColognes();
    const colognes = colognesResponse as Cologne[];
    colognes.forEach((cologne: Cologne) => this.colognes.set(cologne.Id, cologne));
  }

  *getCologne(cologne: string) {
    const colognesResponse = yield this.api.getCologne(cologne);
    this.selectedCologne = colognesResponse as DetailedCologne;
    if (this.selectedCologne.Attributes === null || this.selectedCologne.Attributes === undefined)
      this.selectedCologne.Attributes = [];
  }

  *insertCologneAttributes() {
    const response: KyResponse = yield this.api.insertCologneAttributes(this.selectedCologne.Id, this.addedAttributes);
    if (response.ok) {
      this.setAddAttributesModalShown(false);
      return true;
    }
  }

  setAddModalShown(shown: boolean) {
    this.addModalShown = shown;
  }

  setAddAttributesModalShown(shown: boolean) {
    this.addAttributesModalShown = shown;
  }

  setDeleteAttributesModalShown(shown: boolean) {
    this.deleteAttributesModalShown = shown;
  }

  deleteChip(chip: string) {
    const chipIndex = this.addedAttributes.indexOf(chip);
    this.addedAttributes.splice(chipIndex, 1);
  }

}
