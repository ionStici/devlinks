import { ProtectedRoute } from '@/lib/protected-route';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/auth/login',
    lazy: async () => {
      const { LoginRoute } = await import('./routes/auth/login');
      return { Component: LoginRoute };
    },
  },
  {
    path: '/auth/register',
    lazy: async () => {
      const { RegisterRoute } = await import('./routes/auth/register');
      return { Component: RegisterRoute };
    },
  },
  {
    path: '/auth/reset-password',
    lazy: async () => {
      const { ResetPasswordRoute } = await import(
        './routes/auth/reset-password'
      );
      return { Component: ResetPasswordRoute };
    },
  },
  {
    path: '/terms',
    lazy: async () => {
      const { TermsRoute } = await import('./routes/terms');
      return { Component: TermsRoute };
    },
  },
  {
    path: '/list',
    lazy: async () => {
      const { ListRoute } = await import('./routes/list');
      return { Component: ListRoute };
    },
  },
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to="/editor/profile" replace />,
      },
      {
        path: 'editor',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Navigate to="/editor/profile" replace />,
          },
          {
            path: 'profile',
            lazy: async () => {
              const { ProfileRoute } = await import('./routes/editor/profile');
              return { Component: ProfileRoute };
            },
          },
          {
            path: 'links',
            lazy: async () => {
              const { LinksRoute } = await import('./routes/editor/links');
              return { Component: LinksRoute };
            },
          },
          {
            path: 'account',
            lazy: async () => {
              const { AccountRoute } = await import('./routes/editor/account');
              return { Component: AccountRoute };
            },
          },
        ],
      },
    ],
  },
  {
    path: '/:user',
    lazy: async () => {
      const { UserRoute } = await import('./routes/user');
      return { Component: UserRoute };
    },
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFoundRoute } = await import('./routes/not-found');
      return { Component: NotFoundRoute };
    },
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
