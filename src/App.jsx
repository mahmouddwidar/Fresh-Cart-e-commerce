import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./Context/CartContext";

function App() {
	let routers = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: "register", element: <Register /> },
				{ path: "login", element: <Login /> },
				{ path: "products", element: <Products /> },
				{ path: "cart", element: <Cart /> },
				{ path: "*", element: <NotFound /> },
			],
		},
	]);

	return (
		<>
			<CartContextProvider>
				<RouterProvider router={routers}></RouterProvider>
			</CartContextProvider>
		</>
	);
}

export default App;
