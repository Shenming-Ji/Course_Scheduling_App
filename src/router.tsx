import { createBrowserHistory } from '@tanstack/history';
import { createRouter, createRootRoute, RouterProvider } from '@tanstack/react-router';
import App from './App';

const history = createBrowserHistory({ window });

const rootRoute = createRootRoute({ component: App });

const router = createRouter({
  routeTree: rootRoute,
  history,
});

export const Router = () => <RouterProvider router={router} />;

export default router;
