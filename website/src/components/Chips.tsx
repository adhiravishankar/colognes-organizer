import { observer } from 'mobx-react-lite';

import { AppStore } from '../stores/AppStore';
import {useCallback} from "react";
import { Chip } from './Chip';


export interface ChipsProps {
  store: AppStore;
}


export const Chips = observer<ChipsProps>((props: ChipsProps) => {

  const deleteChipCallback = useCallback((chip: string) => props.store.deleteChip(chip), [props.store]);

  const chipsJSX = props.store.addedAttributes.map((chipString: string) => {
    return <Chip key={ chipString } chipString={ chipString } deleteChip={ deleteChipCallback } />;
  });

  return <div className="field is-grouped is-grouped-multiline">{ chipsJSX }</div>;
});