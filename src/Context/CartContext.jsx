import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";

export const CartContext = createContext();

export default function CartContextProvider(props) {
	const headers = {
		token: localStorage.getItem("userToken"),
	};

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
			.then((response) => response)
			.catch((err) => err);
	}

	function getLoggedUserCart() {
		return axios
			.get("https://ecommerce.routemisr.com/api/v1/cart", {
				headers: headers,
			})
			.then((response) => response)
			.catch((error) => error);
	}

	function removeCartItem(productId) {
		return axios
			.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
				headers,
			})
			.then((response) => response)
			.catch((error) => error);
	}

	function updateProductQuantity(productId, count) {
		return axios
			.put(
				`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
				{ count },
				{ headers }
			)
			.then((response) => response)
			.catch((err) => err);
	}

	function clearCart() {
		return axios
			.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
			.then((response) => response)
			.catch((error) => error);
	}

	return (
		<CartContext.Provider
			value={{ addToCart, getLoggedUserCart, removeCartItem, updateProductQuantity, clearCart,}}
		>
			{props.children}
		</CartContext.Provider>
	);
}
