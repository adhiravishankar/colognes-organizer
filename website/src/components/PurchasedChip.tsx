import { Badge } from 'react-bootstrap';

export interface PurchasedChipProps {
  purchased: boolean;
}

export function PurchasedChip(props: PurchasedChipProps) {
  return props.purchased ? <Badge bg="success">PURCHASED</Badge> : <Badge bg="danger">NOT PURCHASED</Badge>;
}
