/**
 * Cologne model to represent a singular cologne.
 */
export interface Cologne {
  Id: string;

  Name: string;

  Manufacturer: string;

  Purchased: boolean;

  PurchasedQuantity: number;

  Picture: string;

  Notes: string;
}
