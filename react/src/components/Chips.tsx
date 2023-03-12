import { useCallback } from 'react';

import { Attribute } from '../models/Attribute';
import { Chip } from './Chip';


export interface ChipsProps {
  attributes?: Attribute[];

  chipDelete: (id: string, text: string) => void;
}


export function Chips(props: ChipsProps) {
  const { attributes, chipDelete } = props;
  const deleteChipCallback = useCallback((id: string, chip: string) => chipDelete(id, chip), [attributes, chipDelete]);

  const chipsJSX = attributes.map((attr: Attribute) => {
    return <Chip key={ attr.Id } text={ attr.Attribute } chipId={ attr.Id } deleteChip={ deleteChipCallback } />;
  });

  return <div className="field is-grouped is-grouped-multiline">{ chipsJSX }</div>;
}