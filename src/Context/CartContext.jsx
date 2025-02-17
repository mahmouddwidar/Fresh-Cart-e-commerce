import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
	const [cartCount, setCartCount] = useState(0);

	function addToCart(increment) {
		setCartCount((prevCount) => {
			const newCount = prevCount + increment;
			return newCount < 0 ? 0 : newCount;
		});
	}

	return (
		<CartContext.Provider value={{ cartCount, addToCart }}>
			{props.children}
		</CartContext.Provider>
	);
}
