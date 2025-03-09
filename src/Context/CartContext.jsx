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

	return (
		<CartContext.Provider value={{ addToCart, getLoggedUserCart }}>
			{props.children}
		</CartContext.Provider>
	);
}
