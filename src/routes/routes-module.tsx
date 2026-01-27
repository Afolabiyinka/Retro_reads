import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const RoutesConfig = () => {
  const routesModule = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={routesModule} />
    </>
  );
};

export default RoutesConfig;
