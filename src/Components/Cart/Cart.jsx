import { useContext } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {

	let {cartCount, addToCart} = useContext(CartContext);

	return (
		<>
			<h1>Cart</h1>
			<div className="m-3">
				<button className="btn btn-success" onClick={()=>{addToCart(1)}}>+</button>
				<span className="mx-3">{cartCount}</span>
				<button className="btn btn-success" onClick={()=>{addToCart(-1)}} disabled={cartCount <= 0} >-</button>
			</div>
		</>
	);
}
