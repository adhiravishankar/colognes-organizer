import { createContainer } from 'unstated-next';
import { useBoolean } from 'usehooks-ts';

export function useModalsStore() {
  let addAttributeModal = useBoolean(false);
  let addCologneModal = useBoolean(false);
  let deleteAttributesModal = useBoolean(false);

  return { addAttributeModal, addCologneModal, deleteAttributesModal };
}

export const ModalsContainer = createContainer(useModalsStore);
