import { useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { Chips } from '../components/Chips';
import { ColognesContainer } from '../stores/ColognesStore';
import { ModalsContainer } from '../stores/ModalsStore';

export const DeleteAttributesCologne = () => {
  const colognesStore = ColognesContainer.useContainer();
  const modalsStore = ModalsContainer.useContainer();

  const onHide = useCallback(() => modalsStore.addAttributeModal.setFalse(), []);
  const onSubmit = useCallback(() => store.insertCologneAttributes(), []);
  const onDeleteHandler = useCallback((id: string) => store.deleteAttributeFromCologne(id), []);
  return (
    <Modal show={ modalsStore.addAttributeModal.value } onHide={ onHide }>
      <Modal.Header closeButton onHide={ onHide }>
        <Modal.Title>Delete Attributes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Added Attributes</h6>
        <Chips chipDelete={ onDeleteHandler } attributes={ colognesStore.selectedCologne.Attributes } />
        <Button onClick={ onSubmit }>Submit</Button>
      </Modal.Body>
    </Modal>
  );
};

