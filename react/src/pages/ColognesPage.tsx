import { Fragment, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { ImageList } from '../components/ImageList';
import { LabeledImageItem } from '../components/LabeledImageItem';
import { NavBar } from '../components/NavBar';
import { AddCologne } from '../layouts/AddCologne';
import { Cologne } from '../models/Cologne';

export const ColognesPage = () => {
  const navigation = useNavigate();

  const colognesJSX: JSX.Element[] = [];
  const onAdd = useCallback(() => store.setAddModalShown(true), [store]);

  const onClick = useCallback((id: string) => navigation('/colognes/' + id), [store]);
  store.colognes.forEach((cologne: Cologne) => colognesJSX.push(<LabeledImageItem onClick={ onClick } name={ cologne.Name } id={ cologne.Id } />));

  return (
    <Fragment>
      <NavBar name="Colognes" editIcon={ false } onAdd={ onAdd } />
      <Container className="colognes-list colognes-container">
        <ImageList columns={ 6 }>{ colognesJSX }</ImageList>
      </Container>
      <AddCologne />
    </Fragment>
  );
};
