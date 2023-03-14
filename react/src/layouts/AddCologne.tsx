import { useCallback } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { API } from '../api/API';
import { Cologne } from '../models/Cologne';
import { ModalsContainer } from '../stores/ModalsStore';

export const AddCologne = () => {
  const { handleSubmit, control } = useForm<Cologne>();
  const api = new API();
  const ModalsStore = ModalsContainer.useContainer();
  
  
  const purchasedController = useController({ name: 'Purchased', control });
  const disabledPurchased: boolean = !purchasedController.field.value;

  const onHide = useCallback(() => ModalsStore.addAttributeModal.setFalse(), []);
  const onSubmit = useCallback((data: Cologne) => api.insertCologne(data.Name, data.Manufacturer, data.Purchased, data.PurchasedQuantity), []);

  return (
    <Modal show={ModalsStore.addCologneModal.value} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Cologne</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label htmlFor="Name">Name</Form.Label>
          <Controller name="Name" control={control}
                      render={({ field }) => <Form.Control {...field} id="Name" placeholder="Name"/>}/>
          <Form.Text>The name of the cologne</Form.Text>
        </Form.Group>
        <Controller name="Manufacturer" control={control}
                    render={({ field }) => <Form.Control {...field} id="Manufacturer" placeholder="Manufacturer"/>}/>
        <Controller name="PurchasedQuantity" control={control}
                    render={({ field }) => <Form.Control {...field} disabled={disabledPurchased} id="PurchasedQuantity"
                                                       placeholder="Purchased Quantity"/>}/>
        <Form.Check type="switch" id="Purchased" placeholder="Purchased" label="Purchased"
                    checked={purchasedController.field.value} onClick={purchasedController.field.onChange}
                    onBlur={purchasedController.field.onBlur}/>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Modal.Body>
    </Modal>
  );
};

