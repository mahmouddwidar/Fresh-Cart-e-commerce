import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { MutatingDots } from "react-loader-spinner";
import emptyCart from "../../assets/cart/Empty-cart.svg";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Cart() {
	let { getLoggedUserCart, removeCartItem, updateProductQuantity, clearCart } =
		useContext(CartContext);
	const [cartItems, setCartItems] = useState(null);
	let [isLoading, setIsLoading] = useState(false);

	async function getCart() {
		setIsLoading(true);
		try {
			let { data } = await getLoggedUserCart();
			if (data.status === "success") {
				setCartItems(data);
			} else {
				console.error("Error happened while getting cart!", data.message);
			}
		} catch (error) {
			console.error("Error fetching cart:", error);
		} finally {
			setIsLoading(false);
		}
	}

	async function removeCartProduct(productId) {
		try {
			let { data } = await removeCartItem(productId);
			if (data.status === "success") {
				toast.success(`Product deleted successfully from your cart`, {
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					transition: Bounce,
				});
				setCartItems(data);
			} else {
				toast.error("Failed to delete product from cart", {
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					transition: Bounce,
				});
			}
		} catch (error) {
			console.error("Error removing product:", error);
			toast.error("An error occurred while deleting the product", {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
		}
	}

	async function updateProductCount(productId, count) {
		let { data } = await updateProductQuantity(productId, count);
		setCartItems(data);
	}

	async function removeCart() {
		try {
			let { data } = await clearCart();
			if (data.message === "success") {
				toast.success(`Your Cart is empty now`, {
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					transition: Bounce,
				});
				setCartItems(null);
			} else {
				toast.error("Failed to clear your cart", {
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					transition: Bounce,
				});
			}
		} catch (error) {
			console.error("Error clearing cart:", error);
			toast.error("An error occurred while clearing the cart", {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
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
				<ToastContainer />
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
						<div
							className="d-flex justify-content-between align-items-center staggered-animation"
							style={{ "--i": 1 }}
						>
							<h3>Shopping Cart</h3>
							<button
								className="btn btn-outline-danger"
								onClick={() => removeCart()}
							>
								<i className="fa-solid fa-xmark me-2"></i>Clear Cart
							</button>
						</div>
						<div style={{ "--i": 2 }} className="staggered-animation">
							<h4 className="h6 text-main d-flex justify-content-start align-items-end">
								<span className="h2 mb-0 me-1">{cartItems.numOfCartItems}</span>{" "}
								{cartItems.numOfCartItems > 1 ? "Products" : "Product"}
							</h4>
							<h4 className="h6 text-main">
								Total Price:{" "}
								{cartItems.data.totalCartPrice.toLocaleString("en-US")} EGP
							</h4>
							<div
								className="bg-main w-25 mb-3"
								style={{ height: "2px" }}
							></div>
						</div>
						{cartItems.data.products.map((product, index) => (
							<div
								key={index}
								className="row border-bottom mb-3 pb-2 align-items-center staggered-animation"
								style={{ "--i": index + 3 }}
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
											<h4 className="h6 text-muted">
												{product.price.toLocaleString("en-US")} EGP
											</h4>
											<button
												className="btn p-0 w-auto cart-btn-remove"
												onClick={() => removeCartProduct(product.product.id)}
											>
												<i className="fa-solid fa-trash text-danger p-0 me-2"></i>
												Remove
											</button>
										</div>
										<div>
											<button
												className="btn cart-btn px-2 py-1"
												onClick={() =>
													updateProductCount(
														product.product.id,
														product.count + 1
													)
												}
											>
												+
											</button>
											<span className="mx-2">{product.count}</span>
											<button
												className="btn cart-btn px-2 py-1"
												onClick={() =>
													updateProductCount(
														product.product.id,
														product.count - 1
													)
												}
											>
												-
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<img
						className="w-100 my-4 staggered-animation"
						style={{ "--i": 1 }}
						src={emptyCart}
						alt="Empty Cart"
					/>
				)}
			</div>
		</>
	);
}
