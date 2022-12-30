import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { ImageList } from '../components/ImageList';
import { LabeledImageItem } from '../components/LabeledImageItem';
import { NavBar } from '../components/NavBar';
import { Cologne } from '../models/Cologne';
import { AppStore } from '../stores/AppStore';
import { AddCologne } from '../layouts/AddCologne';

export interface ColognesPageProps {
  store: AppStore;
}

export const ColognesPage = observer<ColognesPageProps>((props: ColognesPageProps) => {
  const { store } = props;
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
      <AddCologne store={ store } />
    </Fragment>
  );
});
