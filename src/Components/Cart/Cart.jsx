import { useContext } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function Cart() {
	let { cartCount, addToCart } = useContext(CartContext);

	return (
		<>
			<Helmet>
				<title>Cart - Fresh Cart</title>
				<meta
					name="description"
					content="Review your shopping cart at Fresh Cart. Add or remove items, apply discounts, and proceed to checkout securely. Your perfect purchase is just a click away!"
				/>
			</Helmet>
			<h1>Cart</h1>
			<div className="m-3">
				<button
					className="btn btn-success"
					onClick={() => {
						addToCart(1);
					}}
				>
					+
				</button>
				<span className="mx-3">{cartCount}</span>
				<button
					className="btn btn-success"
					onClick={() => {
						addToCart(-1);
					}}
					disabled={cartCount <= 0}
				>
					-
				</button>
			</div>
		</>
	);
}
