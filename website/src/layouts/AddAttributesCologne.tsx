import { observer } from 'mobx-react-lite';
import { useCallback, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { Chips } from '../components/Chips';
import { AppStore } from '../stores/AppStore';

export interface AddAttrsCologneProps {
  store: AppStore;
}

export const AddAttributesCologne = observer<AddAttrsCologneProps>((props: AddAttrsCologneProps) => {
  const { store } = props;
  const { addedAttributes, addAttributesModalShown } = store;

  const inputRef = useRef(null);
  const navigation = useNavigate();
  const onHide = useCallback(() => store.setAddAttributesModalShown(false), [store]);
  const onPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addedAttributes.push(inputRef.current.value);
      inputRef.current.value = '';
    }
  }, []);
  const onSubmit = useCallback(() => {
    const response = store.insertCologneAttributes();
    if (response) {
      navigation(0);
    }
  }, [store]);
  const onDeleteHandler = useCallback((id: string, text: string) => store.deleteRecentlyAddedChip(text), [store]);

  return (
    <Modal show={ addAttributesModalShown } onHide={ onHide }>
      <Modal.Header closeButton onHide={ onHide }>
        <Modal.Title>Add Attributes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label htmlFor="Name">Attribute</Form.Label>
          <Form.Control ref={ inputRef } onKeyDown={ onPress } id="Name" placeholder="Name" />
          <Form.Text>The name of the cologne</Form.Text>
        </Form.Group>
        <hr />
        <h6>Added Attributes</h6>
        <Chips chipDelete={ onDeleteHandler } attributes={ store.addedAttributes } />
        <Button onClick={ onSubmit }>Submit</Button>
      </Modal.Body>
    </Modal>
  );
});

