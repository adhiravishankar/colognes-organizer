import {useCallback} from "react";

export interface ChipProps {
  chipString: string;

  deleteChip: (chip: string) => void;
}

export function Chip(props: ChipProps) {
  const { chipString, deleteChip } = props;
  const deleteChipHandler = useCallback(() => deleteChip(chipString), [chipString, deleteChip]);
  return (
    <div className="control">
      <div className="tags has-addons">
        <a className="tag is-link">{ chipString }</a>
        <a onClick={ deleteChipHandler } className="tag is-delete"></a>
      </div>
    </div>
  );
}

