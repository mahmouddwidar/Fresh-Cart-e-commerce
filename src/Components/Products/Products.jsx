import { Helmet } from "react-helmet";
import Style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import WishListButton from "../WishListButton/WishListButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { MutatingDots } from "react-loader-spinner";
import { useState } from "react";
import { useEffect } from "react";

export default function Products() {
	let { addToCart } = useContext(CartContext);
	const [allProducts, setAllProducts] = useState([]);

	async function addProduct(productId) {
		let response = await addToCart(productId);
		if (response.data.status === "success") {
			toast.success(`${response.data.message}`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
		} else {
			toast.error(`${response.data.message}`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
		}
	}

	function getAllProducts() {
		return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
	}

	let { data, isLoading } = useQuery("getAllProducts", getAllProducts);
	useEffect( ()=> {
		if (data?.data?.data) {
			setAllProducts(data.data.data);
		}
	}, [data] )

	return (
		<>
			<Helmet>
				<title>Products - Fresh Cart</title>
				<meta
					name="description"
					content="Explore our wide range of products at Fresh Cart. Find the best deals and shop with confidence. Free shipping available!"
				/>
			</Helmet>
			<ToastContainer />
			<div className="row my-4">
				<div className="col-md-3 border">sidebar</div>
				<div className="col-md-9 border">
					<div className="d-flex justify-content-between align-items-center flex-wrap">
						{isLoading ? (
							<div className="d-flex justify-content-center align-items-center w-100">
								<MutatingDots
									visible={true}
									height="80"
									width="80"
									color="#4fa94d"
									ariaLabel="grid-loading"
									radius="12.5"
									wrapperStyle={{}}
									wrapperClass="grid-wrapper"
								/>
							</div>
						) : (
							allProducts.length > 0 ? allProducts.map((product, index) => {
								return (
									<Link
										to={`/product/${product.id}`}
										className={`${Style.product} staggered-animation align-self-start card text-decoration-none mb-4 col-md-3 col-lg-3 m-2 z-0`}
										style={{ "--i": index + 1 }}
										key={index}
									>
										<div className="position-relative">
											<img
												src={product.imageCover}
												alt={product.title}
												className="w-100 card-img-top"
											/>
											{/* {console.log(product._id)} */}
											<WishListButton
												productId={product._id}
												className={Style["wishlist-button"]}
											/>
											<button
												className={`${Style.addToCart} d-flex justify-content-between align-items-center bg-main`}
												title="Add To Cart"
												onClick={(e) => {
													e.stopPropagation();
													e.preventDefault();
													addProduct(product._id);
												}}
											>
												<i className="fa-solid fa-cart-plus"></i>
											</button>
										</div>
										<div className="card-body pb-0">
											<h6 className="mb-0 card-text font-sm fw-medium text-main">
												{product.category.name}
											</h6>
											<h4
												className="card-title h5 fw-bold"
												title={product.title}
											>
												{product.title}
											</h4>
										</div>
										<div className="p-3 d-flex justify-content-between align-items-center">
											<p className="fw-light m-0">{product.price} EGP</p>
											<span>
												{product.ratingsAverage}{" "}
												<i className="fa-solid fa-star rating-color"></i>
											</span>
										</div>
									</Link>
								);
							}) : ''
						)}
					</div>
				</div>
			</div>
		</>
	);
}
