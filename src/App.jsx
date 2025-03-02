import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./Context/CartContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
	let routers = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
				{ path: "register", element: <Register /> },
				{ path: "login", element: <Login /> },
				{ path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
				{ path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
				{ path: "*", element: <NotFound /> },
			],
		},
	]);

	let queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<CartContextProvider>
					<RouterProvider router={routers}></RouterProvider>
				</CartContextProvider>
			</UserContextProvider>
		</QueryClientProvider>
	);
}

export default App;
