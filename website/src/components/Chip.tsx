import {useCallback} from "react";

export interface ChipProps {
  chipId: string;

  text: string;

  deleteChip: (id: string, chip: string) => void;
}

export function Chip(props: ChipProps) {
  const { chipId, text, deleteChip } = props;
  const deleteChipHandler = useCallback(() => deleteChip(chipId, text), [chipId, text, deleteChip]);
  return (
    <div className="control">
      <div className="tags has-addons">
        <a className="tag is-link">{ text }</a>
        <a onClick={ deleteChipHandler } className="tag is-delete"></a>
      </div>
    </div>
  );
}

