import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { NavBar } from '../components/NavBar';
import { Cologne } from '../models/Cologne';
import { AppStore } from '../stores/AppStore';

export interface AddCologneProps {
  store: AppStore;
}

export const AddCologne = observer<AddCologneProps>((props: AddCologneProps) => {
  const { store } = props;
  const { handleSubmit, control } = useForm<Cologne>();
  const purchasedController = useController({ name: 'Purchased', control });
  const disabledPurchased: boolean = !purchasedController.field.value;

  const onSubmit = useCallback((data: Cologne) => store.api.insertCologne(data.Name, data.Manufacturer, data.Purchased, data.PurchasedQuantity), []);

  return (
    <Fragment>
      <NavBar name="Add Cologne" editIcon={ false } />
      <Container>
        <Card>
          <Card.Header><Card.Title>Add Cologne</Card.Title></Card.Header>
          <Card.Body>
            <Stack gap={ 3 }>
              <Row>
                <Col>
                  <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="Name" placeholder="Name" /> }/>
                </Col>
                <Col>
                  <Controller name="Manufacturer" control={control} render={({ field }) => <Form.Control { ...field } id="Manufacturer" placeholder="Manufacturer" /> }/>
                </Col>
                <Col className="col-2">
                  <Controller name="PurchasedQuantity" control={control} render={({ field }) => <Form.Control { ...field } disabled={ disabledPurchased } id="PurchasedQuantity" placeholder="Purchased Quantity" /> }/>
                </Col>
                <Col className="col-2 col-switch">
                  <Form.Check type="switch" id="Purchased" placeholder="Purchased" label="Purchased" checked={ purchasedController.field.value } onClick={ purchasedController.field.onChange } onBlur={ purchasedController.field.onBlur } />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button onClick={ handleSubmit(onSubmit) }>Submit</Button>
                </Col>
              </Row>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
});

