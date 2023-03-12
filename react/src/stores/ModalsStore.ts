import { useState } from 'react';
import { createContainer } from 'unstated-next';

export function useModalsStore() {
  let [addAttributeModal, setAddAttributeModalShown] = useState<boolean>(false);
  let [addCologneModal, setAddCologneModalShown] = useState<boolean>(false);
  let [deleteAttributesModal, setDeleteAttributesModalShown] = useState<boolean>(false);

  return { addAttributeModal, setAddAttributeModalShown, addCologneModal, setAddCologneModalShown, deleteAttributesModal, setDeleteAttributesModalShown };
}

export const ModalsContainer = createContainer(useModalsStore);
