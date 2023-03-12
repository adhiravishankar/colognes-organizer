import { RouterProvider } from 'react-router';

import { createRouter } from './routes/routes';


export function App() {
  const router = createRouter();

  return <RouterProvider router={ router } />;
}

