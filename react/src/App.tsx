import { RouterProvider } from 'react-router';

import { createRouter } from './routes/routes';
import { ModalsContainer } from './stores/ModalsStore';


export function App() {
  const router = createRouter();

  return (
    <ModalsContainer.Provider>
      <RouterProvider router={ router } />
    </ModalsContainer.Provider>
  );
}

