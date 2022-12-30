import { Attribute } from './Attribute';
import { Cologne } from './Cologne';

export interface DetailedCologne extends Cologne {
  Attributes: Attribute[];
}
