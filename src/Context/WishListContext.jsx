import axios from "axios";
import { createContext } from "react";

export const WishListContext = createContext();

export default function WishListContextProvider(props) {
	const headers = {
		token: localStorage.getItem("userToken"),
	};

	function addProductToWishList(productId) {
		return axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/wishlist`,
				{ productId },
				{ headers }
			)
			.then((response) => response)
			.catch((error) => error);
	}

	return (
		<WishListContext.Provider value={{addProductToWishList}}>
			{props.children}
		</WishListContext.Provider>
	);
}
