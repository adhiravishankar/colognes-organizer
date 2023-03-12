import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { Chips } from '../components/Chips';
import { AppStore } from '../stores/AppStore';

export interface AddAttrsCologneProps {
  store: AppStore;
}

export const AddAttributesCologne = observer<AddAttrsCologneProps>((props: AddAttrsCologneProps) => {
  const { store } = props;
  const { addAttributesModalShown } = store;

  const onHide = useCallback(() => store.setAddAttributesModalShown(false), [store]);
  const onSubmit = useCallback(() => store.insertCologneAttributes(), [store]);
  const onDeleteHandler = useCallback((id: string) => store.deleteAttributeFromCologne(id), [store]);
  return (
    <Modal show={ addAttributesModalShown } onHide={ onHide }>
      <Modal.Header closeButton onHide={ onHide }>
        <Modal.Title>Delete Attributes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Added Attributes</h6>
        <Chips chipDelete={ onDeleteHandler } attributes={ store.selectedCologne.Attributes } />
        <Button onClick={ onSubmit }>Submit</Button>
      </Modal.Body>
    </Modal>
  );
});

