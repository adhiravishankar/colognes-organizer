import { observer } from 'mobx-react-lite';
import {ChangeEvent, useCallback, useRef, useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { AppStore } from '../stores/AppStore';

export interface AddAttrsCologneProps {
  store: AppStore;
}

export const AddAttributesCologne = observer<AddAttrsCologneProps>((props: AddAttrsCologneProps) => {
  const { store } = props;
  const { addedAttributes, addAttributesModalShown, setAddAttributesModalShown } = store;

  const inputRef = useRef(null);
  const onHide = useCallback(() => setAddAttributesModalShown(false), [store]);
  const onPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addedAttributes.push(inputRef.current.value.toLowerCase());
      inputRef.current.value = '';
    }
  }, []);

  return (
    <Modal show={ addAttributesModalShown } onHide={ onHide }>
      <Modal.Header closeButton>
        <Modal.Title>Add Attributes Cologne</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label htmlFor="Name">Attribute</Form.Label>
          <Form.Control ref={ inputRef } onKeyDown={ onPress } id="Name" placeholder="Name" />
          <Form.Text>The name of the cologne</Form.Text>
        </Form.Group>
        <hr />
        <h6>Added Attributes</h6>
        <p>{ addedAttributes.length === 0 ? 'No attributes have been added' : addedAttributes.toString() }</p>
        <Button onClick={ null }>Submit</Button>
      </Modal.Body>
    </Modal>
  );
});

