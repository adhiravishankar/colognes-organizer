import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { ImageItem } from '../components/ImageItem';
import { NavBar } from '../components/NavBar';
import { PurchasedChip } from '../components/PurchasedChip';
import { AddAttributesCologne } from '../layouts/AddAttributesCologne';
import { AddCologne } from '../layouts/AddCologne';
import { AppStore } from '../stores/AppStore';

export interface ColognePageProps {
  store: AppStore;
}

export const ColognePage = observer<ColognePageProps>((props: ColognePageProps) => {
  const { store } = props;
  const { selectedCologne: cologne } = store;
  const onAdd = useCallback(() => store.setAddModalShown(true), [store]);
  const onAddAttributes = useCallback(() => store.setAddAttributesModalShown(true), [store]);
  const onDeleteAttributes = useCallback(() => store.setDeleteAttributesModalShown(true), [store]);
  return (
    <Fragment>
      <NavBar name="Colognes" editIcon={ false } onAdd={ onAdd } />
      <Container className="colognes-list colognes-container">
        <Row>
          <Col className="col-2">
            <ImageItem name={ cologne.Name } source={ cologne.Picture } />
          </Col>
          <Col className="col-2">
            <Card>
              <Card.Header><Card.Title>{ cologne.Name }</Card.Title></Card.Header>
              <Card.Body>
                <h6>Manufacturer</h6>
                <Card.Text>{ cologne.Manufacturer }</Card.Text>
                <h6>Purchased</h6>
                <PurchasedChip purchased={ cologne.Purchased } purchasedQuantity={ cologne.PurchasedQuantity } />
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-4">
            <Card>
              <Card.Header className="icons-card-header">
                <Card.Title>Attributes</Card.Title>
                <div className="card-header-icons">
                  <i onClick={ onAddAttributes } className="fas fa-plus" />
                  <i onClick={ onDeleteAttributes } className="fas fa-trash" />
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Text>{ cologne.Attributes.toString() }</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AddCologne store={ store } />
      <AddAttributesCologne store={ store } />
    </Fragment>
  );
});
