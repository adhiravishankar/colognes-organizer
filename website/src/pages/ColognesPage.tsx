import { observer } from 'mobx-react-lite';
import { ImageList } from '../components/ImageList';

export interface ColognesPageProps {
  
}

export const ColognesPage = observer<ColognesPageProps>((props: ColognesPageProps) => {
  return (
    <ImageList columns={ 5 }>

    </ImageList>
  );
});
