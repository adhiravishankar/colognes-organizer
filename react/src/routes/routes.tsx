import { createBrowserRouter } from 'react-router-dom';

import { ColognePage } from '../pages/ColognePage';
import { ColognesPage } from '../pages/ColognesPage';
import { AppStore } from '../stores/AppStore';

export function createRouter(store: AppStore) {
  return createBrowserRouter([
    {
      path: '/',
      loader: async () => {
        await store.listColognes();
        return null;
      },
      element: <ColognesPage store={store}/>,
    },
    {
      path: '/colognes/:cologne',
      loader: async ({ params }) => {
        await store.listColognes();
        // @ts-ignore
        await store.getCologne(params.cologne);
        return null;
      },
      element: <ColognePage store={store}/>,
    },
  ]);
}
