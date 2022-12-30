import { Fragment } from 'react';
import { Badge } from 'react-bootstrap';

export interface PurchasedChipProps {
  purchased: boolean;

  purchasedQuantity: number;
}

export function PurchasedChip(props: PurchasedChipProps) {
  const { purchased, purchasedQuantity } = props;
  const purchasedJSX = purchased ? <Badge bg="success">PURCHASED</Badge> : <Badge bg="danger">NOT PURCHASED</Badge>;
  const purchasedQuantityJSX = purchased ? ` (${ purchasedQuantity } mL)` : '';
  return (
    <Fragment>
      { purchasedJSX }
      { purchasedQuantityJSX }
    </Fragment>
  );
}
