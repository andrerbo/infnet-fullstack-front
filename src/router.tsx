import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import CarList from './content/CarList';
import CarFormValidation from './content/CarFormValidation';
import CarFormEditValidation from './content/CarFormEditValidation';
import Login from './content/Login';
import PrivateRoute from './privateRoute';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
// const UsersList = Loader(lazy(() => import('src/content/CarList')));
// const UsersForm = Loader(lazy(() => import('src/content/CarList')));

const routes: RouteObject[] = [
  {
    path: '/home',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: '',
            element: <CarList />
          },
          {
            path: 'new-car',
            element: <CarFormValidation />
          },
          {
            path: 'edit-car/:id',
            element: <CarFormEditValidation />
          },
        ]
      },
    ]
  },
  {
    path: 'login',
    element: <Login />,
    children: []
  },
  {
    path: '/',
    element: <Login />,
    children: []
  },
];

export default routes;
