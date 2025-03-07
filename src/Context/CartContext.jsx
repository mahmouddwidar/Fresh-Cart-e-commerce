import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const CartContext = createContext();

export default function CartContextProvider(props) {
	const [cartCount, setCartCount] = useState(0);
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

	return (
		<CartContext.Provider value={{ cartCount, addToCart }}>
			{props.children}
		</CartContext.Provider>
	);
}
