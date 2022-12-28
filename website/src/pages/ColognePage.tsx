import { observer } from 'mobx-react-lite';

import { AppStore } from '../stores/AppStore';

export interface ColognePageProps {
  store: AppStore;
}

export const ColognePage = observer<ColognePageProps>((props: ColognePageProps) => {
  return <div>Cologne</div>;
});
