import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";

function App() {

  let routers = createBrowserRouter([
    {path: "/", element: <Layout />, children: [
      {index:true, element: <Home />},
      {path: 'login', element: <Login />},
      {path: 'products', element: <Products />},
      {path: 'register', element: <Register />},
      {path: '*', element: <NotFound />},
    ]}
  ]);

	return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
