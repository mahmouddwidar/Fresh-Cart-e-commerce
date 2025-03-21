import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const CartContext = createContext();

export default function CartContextProvider(props) {
	const headers = {
		token: localStorage.getItem("userToken"),
	};

	const [numOfCartItems, setNumOfCartItems] = useState(0);

	useEffect(() => {
		getLoggedUserCart();
	}, []);

	function addToCart(productId) {
		return axios
			.post(
				"https://ecommerce.routemisr.com/api/v1/cart",
				{
					productId,
				},
				{
					headers,
				}
			)
			.then((response) => {
				setNumOfCartItems(response.data.numOfCartItems);
				return response;
			})
			.catch((err) => err);
	}

	function getLoggedUserCart() {
		return axios
			.get("https://ecommerce.routemisr.com/api/v1/cart", {
				headers: headers,
			})
			.then((response) => {
				setNumOfCartItems(response.data.numOfCartItems);
				return response;
			})
			.catch((error) => error);
	}

	function removeCartItem(productId) {
		return axios
			.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
				headers,
			})
			.then((response) => {
				setNumOfCartItems(response.data.numOfCartItems);
				return response;
			})
			.catch((error) => error);
	}

	function updateProductQuantity(productId, count) {
		return axios
			.put(
				`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
				{ count },
				{ headers }
			)
			.then((response) => {
				setNumOfCartItems(response.data.numOfCartItems);
				return response;
			})
			.catch((err) => err);
	}

	function clearCart() {
		return axios
			.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
			.then((response) => {
				setNumOfCartItems(response.data.numOfCartItems);
				return response;
			})
			.catch((error) => error);
	}

	//http://localhost:5173/profile
	function onlineCheckout(cartId, url, shippingAddress) {
		return axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
				{ shippingAddress }, // Pass shippingAddress in the request body
				{ headers } // Include headers in the request configuration
			)
			.then((response) => response)
			.catch((error) => error);
	}
	return (
		<CartContext.Provider
			value={{
				addToCart,
				getLoggedUserCart,
				removeCartItem,
				updateProductQuantity,
				clearCart,
				numOfCartItems,
				onlineCheckout,
			}}
		>
			{props.children}
		</CartContext.Provider>
	);
}
