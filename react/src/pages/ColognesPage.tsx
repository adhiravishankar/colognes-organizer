import { Fragment, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { ImageList } from '../components/ImageList';
import { LabeledImageItem } from '../components/LabeledImageItem';
import { NavBar } from '../components/NavBar';
import { AddCologne } from '../layouts/AddCologne';
import { Cologne } from '../models/Cologne';
import { ColognesContainer } from '../stores/ColognesStore';
import { ModalsContainer } from '../stores/ModalsStore';

export const ColognesPage = () => {
  const navigation = useNavigate();
  const modalsStore = ModalsContainer.useContainer();
  const colognesStore = ColognesContainer.useContainer();

  const onAdd = useCallback(() => modalsStore.setAddCologneModalShown(true), []);
  const onClick = useCallback((id: string) => navigation('/colognes/' + id), []);
  const colognesJSX = colognesStore.colognes.map((cologne: Cologne) => <LabeledImageItem onClick={ onClick } name={ cologne.Name } id={ cologne.Id } />);

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
