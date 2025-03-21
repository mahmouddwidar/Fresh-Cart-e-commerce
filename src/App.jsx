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
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ProfileLayout from "./Components/ProfileLayout/ProfileLayout";
import Profile from "./Components/Profile/Profile";
import Addresses from "./Components/Addresses/Addresses";
import Orders from "./Components/Orders/Orders";
import { QueryClient, QueryClientProvider } from "react-query";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";
import AddressesContextProvider from "./Context/AddressesContext";

function App() {
	let routers = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: (
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					),
				},
				{ path: "register", element: <Register /> },
				{ path: "login", element: <Login /> },
				{
					path: "products",
					element: (
						<ProtectedRoute>
							<Products />
						</ProtectedRoute>
					),
				},
				{
					path: "product/:id",
					element: (
						<ProtectedRoute>
							<ProductDetails />
						</ProtectedRoute>
					),
				},
				{
					path: "cart",
					element: (
						<ProtectedRoute>
							<Cart />
						</ProtectedRoute>
					),
				},
				{
					path: "profile",
					element: (
						<ProtectedRoute>
							<ProfileLayout />
						</ProtectedRoute>
					),
					children: [
						{
							index: true,
							element: (
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							),
						},
						{
							path: "addresses",
							element: (
								<ProtectedRoute>
									<Addresses />
								</ProtectedRoute>
							),
						},
						{
							path: "allorders",
							element: (
								<ProtectedRoute>
									<Orders />
								</ProtectedRoute>
							),
						},
						{
							path: "wishlist",
							element: (
								<ProtectedRoute>
									<WishList />
								</ProtectedRoute>
							),
						},
					],
				},
				{ path: "*", element: <NotFound /> },
			],
		},
	]);

	let queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<CartContextProvider>
					<WishListContextProvider>
						<AddressesContextProvider>
							<RouterProvider router={routers}></RouterProvider>
						</AddressesContextProvider>
					</WishListContextProvider>
				</CartContextProvider>
			</UserContextProvider>
		</QueryClientProvider>
	);
}

export default App;
