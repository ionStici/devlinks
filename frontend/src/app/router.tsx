import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
