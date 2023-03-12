import { createBrowserRouter } from 'react-router-dom';

import { ColognePage } from '../pages/ColognePage';
import { ColognesPage } from '../pages/ColognesPage';

export function createRouter() {
  return createBrowserRouter([
    {
      path: '/',
      loader: async () => {
        return null;
      },
      element: <ColognesPage />,
    },
    {
      path: '/colognes/:cologne',
      loader: async () => {
        return null;
      },
      element: <ColognePage />,
    },
  ]);
}
