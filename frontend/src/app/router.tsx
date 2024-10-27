import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./routes/not-found";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    lazy: async () => {
      const { LoginRoute } = await import("./routes/auth/login");
      return { Component: LoginRoute };
    },
  },
  {
    path: "/auth/register",
    lazy: async () => {
      const { RegisterRoute } = await import("./routes/auth/register");
      return { Component: RegisterRoute };
    },
  },
  {
    path: "*",
    lazy: async () => {
      const { NotFoundRoute } = await import("./routes/not-found");
      return { Component: NotFoundRoute };
    },
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
