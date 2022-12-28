import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { ImageItem } from '../components/ImageItem';
import { NavBar } from '../components/NavBar';
import { PurchasedChip } from '../components/PurchasedChip';
import { AppStore } from '../stores/AppStore';
import { AddCologne } from './AddCologne';

export interface ColognePageProps {
  store: AppStore;
}

export const ColognePage = observer<ColognePageProps>((props: ColognePageProps) => {
  const { store } = props;
  const { selectedCologne: cologne } = store;
  const onAdd = useCallback(() => store.setAddModalShown(true), [store]);
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
                <PurchasedChip purchased={ cologne.Purchased } />
                {` (${ cologne.PurchasedQuantity } mL)`}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AddCologne store={ store } />
    </Fragment>
  );
});
