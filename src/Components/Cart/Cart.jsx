import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { MutatingDots } from "react-loader-spinner";
import emptyCart from "../../assets/cart/Empty-cart.svg";

export default function Cart() {
	let { getLoggedUserCart } = useContext(CartContext);
	const [cartItems, setCartItems] = useState(null);
	let [isLoading, setIsLoading] = useState(false);

	async function getCart() {
		setIsLoading(true);
		try {
			let { data } = await getLoggedUserCart();
			if (data.status === "success") {
				setCartItems(data);
				console.log(data.numOfCartItems);
			} else {
				console.error("Error happened while getting cart!", data.message);
			}
		} catch (error) {
			console.error("Error fetching cart:", error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getCart();
	}, []);

	return (
		<>
			<Helmet>
				<title>Cart - Fresh Cart</title>
				<meta
					name="description"
					content="Review your shopping cart at Fresh Cart. Add or remove items, apply discounts, and proceed to checkout securely. Your perfect purchase is just a click away!"
				/>
			</Helmet>

			<div className="w-75 p-2 mx-auto">
				{isLoading ? (
					<div className="d-flex justify-content-center align-items-center">
						<MutatingDots
							visible={true}
							height="100"
							width="100"
							color="#4fa94d"
							secondaryColor="#4fa94d"
							radius="12.5"
							ariaLabel="mutating-dots-loading"
							wrapperStyle={{}}
							wrapperClass=""
						/>
					</div>
				) : cartItems?.numOfCartItems > 0 ? (
					<div className="my-4">
						<h3>Cart Items</h3>
						<div className="bg-main w-25 mb-3" style={{ height: "2px" }}></div>
						{cartItems.data.products.map((product, index) => (
							<div
								key={index}
								className="row border-bottom mb-3 pb-2 align-items-center staggered-animation"
								style={{ "--i": index + 1 }}
							>
								<div className="col-md-2">
									<img
										className="w-100 mb-1"
										src={product.product.imageCover}
										alt={product.product.title}
									/>
								</div>
								<div className="col-md-10">
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<h3 className="h5 fw-bolder">
												{product.product.title.split(" ").slice(0, 3).join(" ")}
											</h3>
											<h4 className="text-main font-sm fw-bolder">
												{product.product.category.name}
											</h4>
											<h4 className="h6 text-muted">{product.price} EGP</h4>
											<button className="btn p-0 w-auto cart-btn-remove">
												<i className="fa-solid fa-trash text-danger p-0 me-2"></i>
												Remove
											</button>
										</div>
										<div>
											<button className="btn cart-btn px-2 py-1">+</button>
											<span className="mx-2">{product.count}</span>
											<button className="btn cart-btn px-2 py-1">-</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<img className="w-100 my-4" src={emptyCart} alt="Empty Cart" />
				)}
			</div>
		</>
	);
}
